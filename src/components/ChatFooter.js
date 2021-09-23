import { Send } from '@material-ui/icons';
import React, { useRef } from 'react';
import './ChatFooter.css';

export default function ChatFooter({
  input,
  onChange,
  sendMessage,
  image,
  user,
  room,
  roomID,
  setAudioID,
}) {
  const inputRef = useRef();

  return (
    <div className="chat__footer">
      <form>
        <input
          value={input}
          onChange={onChange}
          placeholder="Type a message"
          ref={inputRef}
        />
        <button type="submit" className="send__btn" onClick={sendMessage}>
          <label htmlFor="capture" className="send__btn">
            <Send
              style={{
                width: 20,
                height: 20,
                color: 'white',
              }}
            />
          </label>
        </button>
      </form>
    </div>
  );
}
