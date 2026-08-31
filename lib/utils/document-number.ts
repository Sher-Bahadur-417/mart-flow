import "server-only";

import type { Transaction } from "firebase-admin/firestore";

import { collections } from "@/lib/data/fs";
import { firestore } from "@/lib/firebase-admin";

export async function nextDocumentNumber(
  storeId: string,
  key: string,
  prefix: string,
) {
  const ref = firestore.collection(collections.counters).doc(`${storeId}_${key}`);
  const value = await firestore.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const current = snap.exists ? Number(snap.data()?.value ?? 0) : 0;
    const next = current + 1;
    tx.set(ref, { storeId, key, value: next }, { merge: true });
    return next;
  });

  return `${prefix}-${String(value).padStart(6, "0")}`;
}

export async function readNextCounter(
  tx: Transaction,
  storeId: string,
  key: string,
) {
  const ref = firestore.collection(collections.counters).doc(`${storeId}_${key}`);
  const snap = await tx.get(ref);
  return (snap.exists ? Number(snap.data()?.value ?? 0) : 0) + 1;
}

export function writeCounter(
  tx: Transaction,
  storeId: string,
  key: string,
  value: number,
) {
  tx.set(
    firestore.collection(collections.counters).doc(`${storeId}_${key}`),
    { storeId, key, value },
    { merge: true },
  );
}
