import assert from "node:assert/strict";
import { createPrivateKey, generateKeyPairSync } from "node:crypto";
import test from "node:test";

import { normalizeFirebasePrivateKey } from "../lib/firebase/private-key";

const { privateKey: pem } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

function assertParses(value: string) {
  const normalized = normalizeFirebasePrivateKey(value);
  assert.match(normalized, /-----BEGIN PRIVATE KEY-----/);
  assert.match(normalized, /-----END PRIVATE KEY-----/);
  createPrivateKey(normalized);
}

test("accepts a standard PEM with real newlines", () => {
  assertParses(pem);
});

test("accepts a one-line key with escaped newlines", () => {
  assertParses(pem.replace(/\n/g, "\\n"));
});

test("strips wrapping quotes left in the env value", () => {
  assertParses(`"${pem.replace(/\n/g, "\\n")}"`);
});

test("strips nested quotes and carriage returns", () => {
  assertParses(`"${pem.replace(/\n/g, "\r\n")}"`);
  assertParses(pem.replace(/\n/g, "\\r\\n"));
});

test("extracts private_key from a pasted service account JSON", () => {
  const json = JSON.stringify({
    type: "service_account",
    private_key: pem,
    client_email: "svc@example.iam.gserviceaccount.com",
  });
  assertParses(json);
});

test("extracts a PEM surrounded by JSON leftovers", () => {
  const messy = `firebase_admin_private_key": "${pem.replace(/\n/g, "\\n")}",`;
  assertParses(messy);
});

test("rejects empty keys", () => {
  assert.throws(() => normalizeFirebasePrivateKey("   "), /empty/);
});

test("rejects values that are not a PEM", () => {
  assert.throws(() => normalizeFirebasePrivateKey("not-a-key"), /FIREBASE_PRIVATE_KEY/);
});
