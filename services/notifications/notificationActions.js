import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  writeBatch,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  getCountFromServer,
} from 'firebase/firestore';
import { db } from '@/firebase.config';

export async function getUnreadNotificationsCount(userId) {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    where('read', '==', false)
  );

  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
}

export async function getUserNotifications(userId) {
  const notificationsRef = collection(db, 'notifications');

  const q = query(
    notificationsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(10)
  );

  const querySnapshot = await getDocs(q);

  const lastVisible =
    querySnapshot.docs.length > 0
      ? querySnapshot.docs[querySnapshot.docs.length - 1]
      : null;

  const notifications = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { notifications, lastVisible };
}

export function listenForNotifications(userId, callback, errorCallback) {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(10)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      try {
        const notifications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const lastVisible = snapshot.docs[snapshot.docs.length - 1];

        callback(notifications, lastVisible);
      } catch (error) {
        console.error('Error processing snapshot:', error);
        if (errorCallback) errorCallback(error);
      }
    },
    (error) => {
      // firestore query error handler
      console.error("Firestore query error:", error);
      if (errorCallback) errorCallback(error);
    }
  );
}

export async function fetchMoreNotifications(userId, lastDoc) {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    startAfter(lastDoc),
    limit(5)
  );

  const querySnapshot = await getDocs(q);

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const next = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { next, lastVisible };
}

export async function markNotificationAsRead(notificationId) {
  try {
    const docRef = doc(db, 'notifications', notificationId);
    await updateDoc(docRef, { read: true });
  } catch (error) {
    throw error;
  }
}

export async function markAllNotificationsAsRead(userId) {
  try {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', userId),
      where('read', '==', false)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return []; // Return empty array if no unread notifications

    const batch = writeBatch(db);

    const updatedIds = querySnapshot.docs.map((docSnap) => {
      batch.update(doc(db, 'notifications', docSnap.id), { read: true });
      return docSnap.id; // Collect IDs to update UI
    });

    await batch.commit();

    return updatedIds; // Return updated notification IDs
  } catch (error) {
    throw error;
  }
}
