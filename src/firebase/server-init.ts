
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { serverFirebaseConfig } from './config';

let app: FirebaseApp;
if (!getApps().length) {
    app = initializeApp(serverFirebaseConfig, 'server');
} else {
    app = getApp('server');
}

const db = getFirestore(app);

export { db, app };
