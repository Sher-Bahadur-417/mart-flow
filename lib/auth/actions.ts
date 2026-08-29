"use server";

import { redirect } from "next/navigation";

import { writeAuditLog, getRequestContext } from "@/lib/auth/audit";
import { getCurrentUser } from "@/lib/auth/dal";
import { verifyPassword } from "@/lib/auth/password";
import { consumeLoginAttempt } from "@/lib/auth/rate-limit";
import { createSession, deleteSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { LoginSchema, type LoginFormState } from "@/lib/validation/auth";

const DUMMY_HASH =
  "$2b$12$wn6/DL6i7wwb2eg26rYVK.M53bFh7G.BR9h9./uW7RaUvjauI426y";

export async function login(
  _prevState: LoginFormState | undefined,
  formData: FormData,
): Promise<LoginFormState> {
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

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
    select: {
      id: true,
      email: true,
      username: true,
      passwordHash: true,
      isActive: true,
      storeId: true,
      store: { select: { isActive: true } },
    },
  });

  const passwordMatches = await verifyPassword(
    parsed.data.password,
    user?.passwordHash ?? DUMMY_HASH,
  );

  if (!user || !passwordMatches || !user.isActive || user.store?.isActive === false) {
    await writeAuditLog({
      action: "LOGIN_FAILED",
      entity: "AUTH",
      userId: user?.id ?? null,
      storeId: user?.storeId ?? null,
      metadata: { identifier },
    });
    return { error: "Invalid email, username, or password." };
  }

  await createSession(user.id);
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });
  await writeAuditLog({
    action: "LOGIN",
    entity: "AUTH",
    entityId: user.id,
    userId: user.id,
    storeId: user.storeId,
    metadata: { email: user.email, username: user.username },
  });

  redirect("/dashboard");
}

export async function logout() {
  const user = await getCurrentUser();
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
