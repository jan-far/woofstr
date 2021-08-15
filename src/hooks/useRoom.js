import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

export default function useRoom(roomID, userID) {
  const isUserRoom = roomID.includes(userID);

  const doc = isUserRoom ? roomID?.replace(userID, '') : roomID;

  const [snapshot] = useDocument(
    db.collection(isUserRoom ? 'users' : 'rooms').doc(doc)
  );

  if (!snapshot) return null;

  return {
    id: snapshot.id,
    photoURL:
      snapshot.photoURL ||
      `https://avatars.dicebear.com/api/human/${snapshot.id}.svg`,
    ...snapshot.data(),
  };
}
