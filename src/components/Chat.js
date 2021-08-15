import { Avatar, IconButton, Menu } from '@material-ui/core';
import { AddPhotoAlternate, ArrowBack, MoreVert } from '@material-ui/icons';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useRoom from '../hooks/useRoom';
import './Chat.css';

export default function Chat({ user, page }) {
  const { roomID } = useParams();
  const history = useHistory();
  const room = useRoom(roomID, user.uid);

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
          <Avatar src={room?.photoURL} />
        </div>
        <div className="chat__header-info">
          <h3 style={{ width: page.isMobile && page.width - 165 }}>
            {room?.name}
          </h3>
        </div>
        <div className="chat__header-right">
          <input
            id="image"
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
          />
          <IconButton>
            <label style={{ cursor: 'pointer', height: 24 }} htmlFor="image">
              <AddPhotoAlternate />
            </label>
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
          <Menu />
        </div>
      </div>
    </div>
  );
}
