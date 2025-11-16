
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize Firebase for server-side usage
if (!getApps().length) {
    try {
      // Attempt to initialize via Firebase App Hosting environment variables
      initializeApp();
    } catch (e) {
      if (process.env.NODE_ENV === "production") {
        console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
      }
      initializeApp(firebaseConfig);
    }
}

const app = getApp();
const db = getFirestore(app);

export { db, app };
