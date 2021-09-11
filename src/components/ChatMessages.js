import { CircularProgress } from '@material-ui/core';
import AudioPlayer from './AudioPlayer';

export default function ChatMessages({
  messages,
  user,
  roomID,
  audioID,
  setAudioID,
}) {
  if (messages) {
    return messages.map((message) => {
      const isSender = message.uid === user.uid;

      return (
        <div
          key={message.id}
          className={`chat__message ${isSender ? 'chat__sender' : ''}`}
        >
          <span className="chat__name">{message.name}</span>
          {message.imageUrl === 'uploading' ? (
            <div className="image-container">
              <div className="image__container--loader">
                <CircularProgress style={{ width: 40, height: 40 }} />
              </div>
            </div>
          ) : message.imageUrl ? (
            <div className="image-container">
              <img src={message.imageUrl} alt={message.name} />
            </div>
          ) : null}

          {message.audioName ? (
            <AudioPlayer
              sender={isSender}
              roomID={roomID}
              id={message.id}
              audioUrl={message.audioUrl}
              audioID={audioID}
              setAudioID={setAudioID}
            />
          ) : (
            <span className="chat__message--message">{message.message}</span>
          )}
          <span className="chat__timestamp">{message.time}</span>
        </div>
      );
    });
  } else return null;
}
