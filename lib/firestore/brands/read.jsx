"use client";

import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { convertFirestoreTimestampToPlainObject } from "@/utils/firestoreTime";

export function useBrands() {
  const { data, error } = useSWRSubscription(["brands"], ([path], { next }) => {
    const ref = collection(db, path);
    const unsub = onSnapshot(
      ref,
      (snapshot) =>
        next(
          null,
          snapshot.docs.length === 0
            ? null
            : snapshot.docs.map((snap) =>
                convertFirestoreTimestampToPlainObject(snap.data())
              )
        ),
      (err) => next(err, null)
    );
    return () => unsub();
  });

  return { data, error: error?.message, isLoading: data === undefined };
}
