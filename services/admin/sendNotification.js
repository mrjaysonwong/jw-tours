import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase.config';

const pushLinkMap = {
  promo: '/blog/promos',
  update: '/blog/updates',
  announcement: '/blog/announcements',
  newsletter: '/newsletter',
};

export async function sendNotificationToUsers(
  userIds,
  senderId,
  type,
  template,
  surveyLink,
  title,
  message,
  relatedId
) {
  try {
    const link = pushLinkMap[template] || surveyLink;

    const notificationsRef = collection(db, 'notifications');

    const notificationPromises = userIds.map((userId) =>
      addDoc(notificationsRef, {
        userId,
        senderId,
        type,
        template,
        link,
        title,
        message,
        relatedId,
        read: false,
        createdAt: serverTimestamp(),
      })
    );

    await Promise.all(notificationPromises);
  } catch (error) {
    throw error;
  }
}
