import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

export default function useChatMessages(roomID) {
  const [snapshot] = useCollection(
    roomID
      ? db
          .collection('rooms')
          .doc(roomID)
          .collection('messages')
          .orderBy('timestamp', 'asc')
      : null
  );

  const messages = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(
    '🚀 ~ file: useChatMessages.js ~ line 19 ~ messages ~ messages',
    messages
  );

  return messages;
}
