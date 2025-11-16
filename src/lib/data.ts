
import type { User, Part, ServiceRequest, ServiceLog, WithId } from './types';
import { collection, query, where, doc, getDoc, Firestore } from 'firebase/firestore';
import { db } from '@/firebase/server-init';


export const getServiceRequestsByCustomerId = (customerId: string) => {
    try {
        if (!db) throw new Error("Firestore is not initialized.");
        const requestsRef = collection(db, "serviceRequests");
        return query(requestsRef, where("customer.id", "==", customerId));
    } catch(e) {
        console.error(e);
        return null;
    }
}

export const getServiceRequestById = async (id: string): Promise<WithId<ServiceRequest> | undefined> => {
    try {
        if (!db) throw new Error("Firestore is not initialized.");
        const docRef = doc(db, "serviceRequests", id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            return { id: docSnap.id, ...docSnap.data() } as WithId<ServiceRequest>;
        }
    } catch(e) {
        console.error(e);
    }
    return undefined;
}

export const getAllServiceRequests = () => {
    try {
        if (!db) throw new Error("Firestore is not initialized.");
        return query(collection(db, "serviceRequests"));
    } catch(e) {
        console.error(e);
        return null;
    }
}

export const getAllParts = () => {
    try {
        if (!db) throw new Error("Firestore is not initialized.");
        return query(collection(db, "parts"));
    } catch(e) {
        console.error(e);
        return null;
    }
}

export const getUserById = async (id: string): Promise<WithId<User> | undefined> => {
    try {
        if (!db) throw new Error("Firestore is not initialized.");
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            return { id: docSnap.id, ...docSnap.data() } as WithId<User>;
        }
    } catch(e) {
        console.error(e);
    }
    return undefined;
}

export const getAllUsers = () => {
    try {
        if (!db) throw new Error("Firestore is not initialized.");
        return query(collection(db, "users"));
    } catch(e) {
        console.error(e);
        return null;
    }
}
