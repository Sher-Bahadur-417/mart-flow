import "server-only";

import { cookies } from "next/headers";

import {
  decrypt,
  encrypt,
  SESSION_COOKIE,
  SESSION_DURATION_MS,
} from "@/lib/auth/session-token";

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await encrypt({ userId });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export { decrypt, SESSION_COOKIE };
