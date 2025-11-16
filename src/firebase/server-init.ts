
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const serverFirebaseConfig = {
    projectId: process.env.SERVER_FIREBASE_PROJECT_ID,
    appId: process.env.SERVER_FIREBASE_APP_ID,
    apiKey: process.env.SERVER_FIREBASE_API_KEY,
    authDomain: process.env.SERVER_FIREBASE_AUTH_DOMAIN,
    measurementId: process.env.SERVER_FIREBASE_MEASUREMENT_ID,
    storageBucket: process.env.SERVER_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.SERVER_FIREBASE_MESSAGING_SENDER_ID,
};


let app: FirebaseApp;
// This guard is needed to prevent re-initializing the app on hot reloads.
if (!getApps().find(app => app.name === 'server')) {
    app = initializeApp(serverFirebaseConfig, 'server');
} else {
    app = getApp('server');
}

const db = getFirestore(app);

export { db, app };
