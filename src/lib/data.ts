
import type { User, Part, ServiceRequest, ServiceLog, WithId } from './types';
import { getFirestore, collection, query, where, doc, getDoc } from 'firebase/firestore';

let db: any;
function getDb() {
  if (!db) {
    db = getFirestore();
  }
  return db;
}


export const getServiceRequestsByCustomerId = (customerId: string) => {
    try {
        const requestsRef = collection(getDb(), "serviceRequests");
        return query(requestsRef, where("customer.id", "==", customerId));
    } catch(e) {
        console.error(e);
        return null;
    }
}

export const getServiceRequestById = async (id: string): Promise<WithId<ServiceRequest> | undefined> => {
    try {
        const docRef = doc(getDb(), "serviceRequests", id);
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
        return query(collection(getDb(), "serviceRequests"));
    } catch(e) {
        console.error(e);
        return null;
    }
}

export const getAllParts = () => {
    try {
        return query(collection(getDb(), "parts"));
    } catch(e) {
        console.error(e);
        return null;
    }
}

export const getUserById = async (id: string): Promise<WithId<User> | undefined> => {
    try {
        const docRef = doc(getDb(), "users", id);
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
        return query(collection(getDb(), "users"));
    } catch(e) {
        console.error(e);
        return null;
    }
}
