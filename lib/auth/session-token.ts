import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const SESSION_COOKIE = "session";
export const SESSION_DURATION_MS = 12 * 60 * 60 * 1000;

export type SessionTokenPayload = JWTPayload & {
  userId: string;
};

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET must be set to a string of at least 32 characters.",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function encrypt(payload: SessionTokenPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getSecretKey());
}

export async function decrypt(session: string | undefined = "") {
  if (!session) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(session, getSecretKey(), {
      algorithms: ["HS256"],
    });

    if (typeof payload.userId !== "string") {
      return null;
    }

    return payload as SessionTokenPayload;
  } catch {
    return null;
  }
}
