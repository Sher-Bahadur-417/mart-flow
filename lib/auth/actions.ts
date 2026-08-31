"use server";

import { FieldValue } from "firebase-admin/firestore";
import { redirect } from "next/navigation";

import { writeAuditLog, getRequestContext } from "@/lib/auth/audit";
import { getCurrentUser } from "@/lib/auth/dal";
import { consumeLoginAttempt } from "@/lib/auth/rate-limit";
import { isNextRedirect, publicAuthError } from "@/lib/auth/safe-error";
import { createSession, deleteSession } from "@/lib/auth/session";
import { collections } from "@/lib/data/fs";
import { findUserByEmail, findUserByUsername, getStore } from "@/lib/data/queries";
import { adminAuth, firestore } from "@/lib/firebase-admin";
import { signInWithEmailPassword } from "@/lib/firebase/rest-auth";
import { LoginSchema, type LoginFormState } from "@/lib/validation/auth";

function looksLikeEmail(value: string) {
  return value.includes("@");
}

export async function login(
  _prevState: LoginFormState | undefined,
  formData: FormData,
): Promise<LoginFormState> {
  try {
    const parsed = LoginSchema.safeParse({
      identifier: formData.get("identifier") ?? formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsed.success) {
      return { error: "Enter a valid email or username and password." };
    }

    const identifier = parsed.data.identifier.toLowerCase().trim();
    const { ipAddress } = await getRequestContext();
    const allowed = consumeLoginAttempt(`${ipAddress}:${identifier}`);

    if (!allowed) {
      await writeAuditLog({
        action: "LOGIN_RATE_LIMITED",
        entity: "AUTH",
        metadata: { identifier },
      });
      return { error: "Too many sign-in attempts. Try again in 15 minutes." };
    }

    const profile = looksLikeEmail(identifier)
      ? await findUserByEmail(identifier)
      : await findUserByUsername(identifier);

    if (!profile) {
      await writeAuditLog({
        action: "LOGIN_FAILED",
        entity: "AUTH",
        metadata: { identifier },
      });
      return { error: "Invalid email, username, or password." };
    }

    let idToken: string;
    try {
      const signedIn = await signInWithEmailPassword(
        profile.email,
        parsed.data.password,
      );
      idToken = signedIn.idToken;
    } catch {
      await writeAuditLog({
        action: "LOGIN_FAILED",
        entity: "AUTH",
        userId: profile.id,
        storeId: profile.storeId,
        metadata: { identifier },
      });
      return { error: "Invalid email, username, or password." };
    }

    const decoded = await adminAuth.verifyIdToken(idToken);
    if (decoded.uid !== profile.id) {
      return { error: "Invalid email, username, or password." };
    }

    const store = profile.storeId ? await getStore(profile.storeId) : null;
    if (!profile.isActive || store?.isActive === false) {
      await writeAuditLog({
        action: "LOGIN_FAILED",
        entity: "AUTH",
        userId: profile.id,
        storeId: profile.storeId,
        metadata: { identifier, reason: "inactive" },
      });
      return { error: "Invalid email, username, or password." };
    }

    await createSession(profile.id);
    await firestore.collection(collections.users).doc(profile.id).set(
      {
        lastLoginAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
    await writeAuditLog({
      action: "LOGIN",
      entity: "AUTH",
      entityId: profile.id,
      userId: profile.id,
      storeId: profile.storeId,
      metadata: { email: profile.email, username: profile.username },
    });
  } catch (error) {
    if (isNextRedirect(error)) {
      throw error;
    }
    console.error("Login failed", error);
    return { error: publicAuthError(error) };
  }

  redirect("/dashboard");
}

export async function logout() {
  let user: Awaited<ReturnType<typeof getCurrentUser>> = null;
  try {
    user = await getCurrentUser();
  } catch (error) {
    console.error("Logout lookup failed", error);
  }

  await deleteSession();

  if (user) {
    await writeAuditLog({
      action: "LOGOUT",
      entity: "AUTH",
      entityId: user.id,
      userId: user.id,
      storeId: user.storeId,
      metadata: { email: user.email },
    });
  }

  redirect("/login");
}
