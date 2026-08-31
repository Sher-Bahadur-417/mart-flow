/**
 * Firebase service-account PEMs arrive from .env / Vercel in several shapes.
 * Normalize them into a PKCS#8 PEM that Node's crypto can parse.
 */
const PEM_HEADER = /-----BEGIN [A-Z ]+KEY-----/;
const PEM_FOOTER = /-----END [A-Z ]+KEY-----/;
const PEM_BLOCK = /-----BEGIN [A-Z ]+KEY-----[\s\S]*?-----END [A-Z ]+KEY-----/;

export function normalizeFirebasePrivateKey(raw: string): string {
  let key = stripBom(raw).trim();
  if (!key) {
    throw new Error("FIREBASE_PRIVATE_KEY is empty.");
  }

  key = key.replace(/[\u2010-\u2015\u2212]/g, "-");
  key = key.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");
  key = key.replace(/\\"/g, '"').replace(/\\'/g, "'");
  key = unwrapQuotes(key);
  key = extractFromServiceAccountJson(key);
  key = unwrapQuotes(key);
  key = unescapeNewlines(key);
  key = key.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\u00a0/g, " ");

  const pem = extractPemBlock(key);
  if (pem) {
    key = pem;
  }

  key = decodeBase64IfNeeded(key.trim());
  key = rewrapPem(key.trim());

  if (!PEM_HEADER.test(key) || !PEM_FOOTER.test(key)) {
    throw new Error(describePrivateKeyProblem(raw));
  }

  return key.endsWith("\n") ? key : `${key}\n`;
}

export function describePrivateKeyProblem(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "FIREBASE_PRIVATE_KEY is empty.";
  }
  if (trimmed.endsWith(".json")) {
    return "FIREBASE_PRIVATE_KEY looks like a file path. Set FIREBASE_SERVICE_ACCOUNT_PATH to the service account JSON file instead.";
  }
  if (trimmed.startsWith("{") && trimmed.length < 80) {
    return "FIREBASE_PRIVATE_KEY looks like truncated JSON. Set FIREBASE_SERVICE_ACCOUNT_PATH to the downloaded JSON file, or paste private_key as one quoted line.";
  }
  if (trimmed.includes("BEGIN") && !trimmed.includes("END")) {
    return "FIREBASE_PRIVATE_KEY is truncated (BEGIN without END). Put the entire key on one line in double quotes, or set FIREBASE_SERVICE_ACCOUNT_PATH.";
  }
  return "Failed to parse FIREBASE_PRIVATE_KEY. Copy only the private_key value from the service account JSON into double quotes, or set FIREBASE_SERVICE_ACCOUNT_PATH to that JSON file.";
}

export function invalidPrivateKeyError() {
  return new Error(describePrivateKeyProblem("invalid"));
}

function stripBom(value: string) {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value;
}

function unwrapQuotes(value: string) {
  let key = value.trim();
  for (let i = 0; i < 4; i += 1) {
    const wrapped =
      (key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"));
    if (!wrapped || key.length < 2) {
      break;
    }
    key = key.slice(1, -1).trim();
  }
  return key;
}

function extractFromServiceAccountJson(value: string) {
  const trimmed = value.trim();
  if (!trimmed.startsWith("{")) {
    return value;
  }

  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "private_key" in parsed &&
      typeof parsed.private_key === "string"
    ) {
      return parsed.private_key;
    }
  } catch {
    return value;
  }

  return value;
}

function unescapeNewlines(value: string) {
  let key = value.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n").replace(/\\r/g, "\n");
  for (let i = 0; i < 2 && key.includes("\\n"); i += 1) {
    key = key.replace(/\\n/g, "\n");
  }
  return key;
}

function extractPemBlock(value: string) {
  return value.match(PEM_BLOCK)?.[0] ?? null;
}

function decodeBase64IfNeeded(value: string) {
  if (value.includes("BEGIN")) {
    return value;
  }

  const compact = value.replace(/\s/g, "");
  if (compact.length < 80 || !/^[A-Za-z0-9+/=]+$/.test(compact)) {
    return value;
  }

  try {
    const decoded = Buffer.from(compact, "base64").toString("utf8");
    if (decoded.includes("BEGIN")) {
      return decoded;
    }
  } catch {
    return value;
  }

  return value;
}

function rewrapPem(value: string) {
  const headerMatch = value.match(PEM_HEADER);
  const footerMatch = value.match(PEM_FOOTER);
  if (!headerMatch || !footerMatch || headerMatch.index === undefined) {
    return value;
  }

  const header = headerMatch[0];
  const footer = footerMatch[0];
  const bodyStart = headerMatch.index + header.length;
  const bodyEnd = value.indexOf(footer, bodyStart);
  if (bodyEnd < 0) {
    return value;
  }

  const body = value.slice(bodyStart, bodyEnd).replace(/\\n/g, "").replace(/\s+/g, "");
  if (!body) {
    return value;
  }

  const wrapped = body.match(/.{1,64}/g)?.join("\n") ?? body;
  return `${header}\n${wrapped}\n${footer}\n`;
}
