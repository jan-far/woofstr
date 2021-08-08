import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import './Sidebar.css';
import { auth } from '../firebase';
import { ExitToApp } from '@material-ui/icons';

export default function Sidebar({ user, page }) {
  function signOut() {
    auth.signOut();
  }

  return (
    <div
      className="sidebar"
      style={{
        minHeight: page.isMobile ? page.height : 'auto',
      }}
    >
      <div className="sidebar__header">
        <div className="sidebar__header--left">
          <Avatar src={user?.photoURL} />
          <h4>{user?.displayName}</h4>
        </div>
        <div className="sidebar__header--right">
          <IconButton onClick={signOut}>
            <ExitToApp />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
