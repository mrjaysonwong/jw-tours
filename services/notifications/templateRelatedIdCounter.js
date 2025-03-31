import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase.config';

export async function templateRelatedIdCounter(template) {
  try {
    const templateCountersRef = collection(db, 'templateCounters');

    const q = query(
      templateCountersRef,
      where('template', '==', template)
    );
    const querySnapshot = await getDocs(q);

    let relatedId;

    if (querySnapshot.empty) {
      // Add a new document if no document exists
      await addDoc(templateCountersRef, {
        template: template,
        counter: 1,
      });

      relatedId = `${template}1`; // Initial counter
    } else {
      // If a document exists, update the counter
      const docSnapshot = querySnapshot.docs[0];

      const currentCounter = docSnapshot.data().counter;
      const newCounter = currentCounter + 1;

      const docRef = doc(db, 'templateCounters', docSnapshot.id);

      await updateDoc(docRef, { counter: newCounter });

      relatedId = `${template}${newCounter}`;
    }

    return relatedId;
  } catch (error) {
    throw error;
  }
}
