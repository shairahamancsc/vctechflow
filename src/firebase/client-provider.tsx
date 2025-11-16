"use client";

import { useMemo } from "react";
import { FirebaseProvider, FirebaseProviderProps } from "./provider";
import { initializeFirebase } from ".";

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const { firebaseApp, firestore, auth } = useMemo(() => initializeFirebase(), []);

  const props: FirebaseProviderProps = {
    firebaseApp,
    firestore,
    auth,
    children,
  }
  return <FirebaseProvider {...props} />
}
