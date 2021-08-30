import {
  CancelRounded,
  CheckCircleRounded,
  MicRounded,
  Send,
} from '@material-ui/icons';
import React, { useState, useRef, useEffect } from 'react';
import './ChatFooter.css';
import recordAudio from './recordAudio';

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
  const [isRecording, setIsRecording] = useState(false);
  const recordingEl = useRef();
  const record = useRef();
  const buttonIcons = (
    <>
      <Send
        style={{
          width: 20,
          height: 20,
          color: 'white',
        }}
      />
      <MicRounded
        style={{
          width: 24,
          height: 24,
          color: 'white',
        }}
      />
    </>
  );

  const canRecord = navigator.mediaDevices.getUserMedia && window.MediaRecorder;
  const inputRef = useRef();

  async function startRecording(event) {
    event.preventDefault();
    record.current = await recordAudio();
    inputRef.current.focus();
    inputRef.current.style.width = 'calc(100% - 56px)';
    setIsRecording(true);
    setAudioID('');
  }

  useEffect(() => {
    if (isRecording) {
      recordingEl.current.style.opacity = '1';
      record.current.start();
    }
  }, [isRecording]);

  return (
    <div className="chat__footer">
      <form>
        <input
          value={input}
          onChange={!isRecording ? onChange : null}
          placeholder="Type a message"
          ref={inputRef}
        />

        {canRecord ? (
          <button
            type="submit"
            className="send__btn"
            onClick={
              input.trim() || (input === '' && image)
                ? sendMessage
                : startRecording
            }
          >
            {buttonIcons}
          </button>
        ) : (
          <>
            <label htmlFor="capture" className="send__btn">
              {buttonIcons}
            </label>
            <input
              style={{ display: 'none' }}
              type="file"
              id="capture"
              accept="audio/*"
              capture
            />
          </>
        )}
      </form>
      {isRecording && (
        <div ref={recordingEl} className="record">
          <CancelRounded
            style={{
              width: 30,
              height: 30,
              color: '#f20519',
            }}
          />
          <div>
            <div className="record__redcircle" />

            <div className="record__duration" />
          </div>
          <CheckCircleRounded
            style={{
              width: 30,
              height: 30,
              color: '#41bf49',
            }}
          />
        </div>
      )}
    </div>
  );
}
