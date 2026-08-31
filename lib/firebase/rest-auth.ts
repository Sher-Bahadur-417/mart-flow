import "server-only";

type SignInSuccess = {
  idToken: string;
  localId: string;
  email: string;
};

type FirebaseAuthError = {
  error?: { message?: string };
};

function apiKey() {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "Firebase Auth is not configured. Set NEXT_PUBLIC_FIREBASE_API_KEY.",
    );
  }
  return key;
}

function mapAuthError(message: string | undefined) {
  switch (message) {
    case "EMAIL_EXISTS":
      return "That email is already in use.";
    case "EMAIL_NOT_FOUND":
    case "INVALID_PASSWORD":
    case "INVALID_LOGIN_CREDENTIALS":
      return "Invalid email, username, or password.";
    case "USER_DISABLED":
      return "This account is disabled.";
    case "WEAK_PASSWORD":
      return "Password must be at least 6 characters.";
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      return "Too many attempts. Try again later.";
    default:
      return message
        ? "Authentication failed. Check Firebase Auth configuration."
        : "Authentication failed.";
  }
}

async function postIdentity<T>(path: string, body: Record<string, unknown>) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/${path}?key=${apiKey()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  const payload = (await response.json()) as T & FirebaseAuthError;
  if (!response.ok || payload.error?.message) {
    throw new Error(mapAuthError(payload.error?.message));
  }
  return payload as T;
}

export async function signInWithEmailPassword(email: string, password: string) {
  return postIdentity<SignInSuccess>("accounts:signInWithPassword", {
    email,
    password,
    returnSecureToken: true,
  });
}

export function mapAdminAuthError(error: unknown) {
  const code =
    typeof error === "object" && error && "code" in error
      ? String((error as { code?: string }).code)
      : "";
  const message = error instanceof Error ? error.message : "";
  if (code.includes("email-already-exists") || message.includes("email-already-exists")) {
    return "That email is already in use.";
  }
  if (code.includes("invalid-email")) {
    return "Enter a valid email address.";
  }
  if (code.includes("weak-password")) {
    return "Password must be at least 6 characters.";
  }
  if (code.includes("user-not-found")) {
    return "Account not found.";
  }
  return null;
}
