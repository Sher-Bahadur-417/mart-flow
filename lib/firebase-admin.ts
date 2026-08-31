import "server-only";

import { existsSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";

import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

import {
  invalidPrivateKeyError,
  normalizeFirebasePrivateKey,
} from "@/lib/firebase/private-key";

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Firebase Admin is not configured. Set ${name} in the environment.`,
    );
  }
  return value;
}

function resolveCredentialFile(pathValue: string) {
  const cleaned = pathValue.trim().replace(/^["']|["']$/g, "");
  return isAbsolute(cleaned) ? cleaned : resolve(process.cwd(), cleaned);
}

function credentialFromServiceAccountFile(pathValue: string) {
  const filePath = resolveCredentialFile(pathValue);
  if (!existsSync(filePath)) {
    throw new Error(
      "Firebase service account file not found. Check FIREBASE_SERVICE_ACCOUNT_PATH.",
    );
  }
  return cert(filePath);
}

function getAdminApp(): App {
  const existing = getApps()[0];
  if (existing) {
    return existing;
  }

  try {
    const filePath =
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim() ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
    if (filePath) {
      return initializeApp({ credential: credentialFromServiceAccountFile(filePath) });
    }

    const privateKeyEnv = requiredEnv("FIREBASE_PRIVATE_KEY");
    const unquoted = privateKeyEnv.replace(/^["']|["']$/g, "");
    if (unquoted.endsWith(".json")) {
      return initializeApp({
        credential: credentialFromServiceAccountFile(unquoted),
      });
    }

    return initializeApp({
      credential: cert({
        projectId: requiredEnv("FIREBASE_PROJECT_ID"),
        clientEmail: requiredEnv("FIREBASE_CLIENT_EMAIL"),
        privateKey: normalizeFirebasePrivateKey(privateKeyEnv),
      }),
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("FIREBASE_")) {
      throw error;
    }
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("private key") || message.includes("failed to parse")) {
      throw invalidPrivateKeyError();
    }
    throw error;
  }
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}

export function getDb(): Firestore {
  return getFirestore(getAdminApp());
}

export const adminAuth: Auth = new Proxy({} as Auth, {
  get(_target, property) {
    const auth = getAdminAuth();
    const value = Reflect.get(auth, property, auth) as unknown;
    return typeof value === "function" ? value.bind(auth) : value;
  },
});

export const firestore: Firestore = new Proxy({} as Firestore, {
  get(_target, property) {
    const db = getDb();
    const value = Reflect.get(db, property, db) as unknown;
    return typeof value === "function" ? value.bind(db) : value;
  },
});
