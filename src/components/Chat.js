import React, { useState, useRef, useEffect } from 'react';
import ChatMessages from './ChatMessages';
import ChatFooter from './ChatFooter';
import MediaPreview from './MediaPreview';
import Compressor from 'compressorjs';
import {
  Avatar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  AddPhotoAlternate,
  AddLocation,
  ArrowBack,
  MoreVert,
} from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import useRoom from '../hooks/useRoom';
import useChatMessages from '../hooks/useChatMessages';
import { useGeoLocation } from '../hooks/useGeoLocation';
import './Chat.css';
import { v4 as uuid } from 'uuid';
import { audioStorage, createTimestamp, db, storage } from '../firebase';

export default function Chat({ user, page }) {
  const [image, setImage] = useState(null);
  const [input, setInput] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');
  const [audioID, setAudioID] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { roomID } = useParams();
  const history = useHistory();
  const messages = useChatMessages(roomID);
  const room = useRoom(roomID, user.uid);
  const divRef = useRef(null);

  function scrollToBottom() {
    divRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const geoLocation = useGeoLocation();

  function onChange(event) {
    setInput(event.target.value);
  }

  async function sendMessage(event) {
    event.preventDefault();
    var sound = new Audio('../../notification.wav');
    if (input.trim() || (input === '' && image)) {
      setInput('');
      sound.play();

      if (image) {
        closePreview();
      }
      const imageName = uuid();
      const newMessage = image
        ? {
            name: user.displayName,
            message: input,
            uid: user.uid,
            timestamp: createTimestamp(),
            time: new Date().toUTCString(),
            imageUrl: 'uploading',
            imageName,
          }
        : {
            name: user.displayName,
            message: input,
            uid: user.uid,
            timestamp: createTimestamp(),
            time: new Date().toUTCString(),
          };

      db.collection('users')
        .doc(user.uid)
        .collection('chats')
        .doc(roomID)
        .set({
          name: room.name,
          photoURL: room.photoURL || null,
          timestamp: createTimestamp(),
        });

      const doc = await db
        .collection('rooms')
        .doc(roomID)
        .collection('messages')
        .add(newMessage);

      if (image) {
        new Compressor(image, {
          quality: 0.8,
          maxWidth: 1920,
          async success(result) {
            setPreviewSrc('');
            setImage(null);
            await storage.child(imageName).put(result);
            const url = await storage.child(imageName).getDownloadURL();
            db.collection('rooms')
              .doc(roomID)
              .collection('messages')
              .doc(doc.id)
              .update({
                imageUrl: url,
              });
          },
        });
      }
    }
  }

  function showPreview(event) {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setImage(uploadedFile);
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onload = () => {
        setPreviewSrc(reader.result);
      };
    }
  }

  function closePreview() {
    setPreviewSrc('');
    setImage(null);
  }

  async function deleteRoom() {
    setOpenMenu(false);
    setIsDeleting(true);
    try {
      const roomRef = db.collection('rooms').doc(roomID);
      const roomMessages = await roomRef.collection('messages').get();
      const audioFiles = [];
      const imageFiles = [];
      roomMessages.docs.forEach((doc) => {
        if (doc.data().audioName) {
          audioFiles.push(doc.data().audioName);
        } else if (doc.data().imageName) {
          imageFiles.push(doc.data().imageName);
        }
      });
      await Promise.all([
        ...roomMessages.docs.map((doc) => doc.ref.delete()),
        ...imageFiles.map((image) => storage.child(image).delete()),
        ...audioFiles.map((audio) => audioStorage.child(audio).delete()),
        db
          .collection('users')
          .doc(user.uid)
          .collection('chats')
          .doc(roomID)
          .delete(),
        roomRef.delete(),
      ]);
    } catch (error) {
      console.error('Error deleting room: ', error.message);
    } finally {
      setIsDeleting(false);
      page.isMobile ? history.goBack() : history.replace('/chats');
    }
  }

  const getUrlExtension = (url) => {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  };

  const onMapPreview = async (imgUrl) => {
    try {
      const imgExt = getUrlExtension(imgUrl);
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const file = new File([blob], 'locationImage.' + imgExt, {
        type: blob.type,
      });

      setImage(file);
      setPreviewSrc(response.url);
    } catch (error) {
      console.error('onMapPreview error: ', error);
    }
  };

  function previewLocation(event) {
    event.preventDefault();
    // will only work in localhost:3000:
    const MAPBOX_API_KEY =
      'pk.eyJ1IjoiYnViYmFzZGFkIiwiYSI6ImNrdGZ2bGV4NDBjMWgycHJ0cDE1Z3A2OW4ifQ.lHwOcjL8X-YucjD_U6jt3Q';
    // baseUrl based on https://docs.mapbox.com/api/maps/static-images/#overlay-options
    // const baseUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B${geoLocation.longitude}%2C${geoLocation.latitude}%5D%7D)/${geoLocation.longitude},${geoLocation.latitude},15/500x300?access_token=${MAPBOX_API_KEY}`;
    const baseUrlTwo = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+800080(${geoLocation.longitude},${geoLocation.latitude})/${geoLocation.longitude},${geoLocation.latitude},15/500x300?access_token=${MAPBOX_API_KEY}`;
    onMapPreview(baseUrlTwo);
  }

  return (
    <div className="chat">
      <div style={{ height: page.height }} className="chat__background"></div>
      <div className="chat__header">
        {page.isMobile && (
          <IconButton onClick={history.goBack}>
            <ArrowBack />
          </IconButton>
        )}
        <div className="avatar__container">
          <Avatar
            src={`https://ui-avatars.com/api/?name=${room?.name}&length=3&background=800080&color=fff`}
          />
        </div>
        <div className="chat__header--info">
          <h3 style={{ width: page.isMobile && page.width - 165 }}>
            {room?.name}
          </h3>
        </div>
        <div className="chat__header--right">
          <input
            id="image"
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            onChange={showPreview}
          />
          <IconButton onClick={previewLocation}>
            <label style={{ cursor: 'pointer', height: 24 }} htmlFor="image">
              <AddLocation />
            </label>
          </IconButton>
          <IconButton>
            <label style={{ cursor: 'pointer', height: 24 }} htmlFor="image">
              <AddPhotoAlternate />
            </label>
          </IconButton>
          <IconButton onClick={(event) => setOpenMenu(event.currentTarget)}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={openMenu}
            id="menu"
            keepMounted
            open={Boolean(openMenu)}
            onClose={() => setOpenMenu(null)}
          >
            <MenuItem onClick={deleteRoom}>Delete Room</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="chat__body--container">
        <div className="chat__body" style={{ height: page.height - 168 }}>
          <ChatMessages
            messages={messages}
            user={user}
            roomID={roomID}
            audioID={audioID}
            setAudioID={setAudioID}
          />
          <div ref={divRef} />
        </div>
      </div>
      <MediaPreview src={previewSrc} closePreview={closePreview} />
      <ChatFooter
        input={input}
        onChange={onChange}
        sendMessage={sendMessage}
        image={image}
        room={room}
        roomID={roomID}
        setAudioID={setAudioID}
        user={user}
      />
      {isDeleting && (
        <div className="chat__deleting">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
