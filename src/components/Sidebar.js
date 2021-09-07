import React from 'react';
import SidebarList from './SidebarList';
import { Avatar, IconButton } from '@material-ui/core';
import './Sidebar.css';
import { auth, createTimestamp, db } from '../firebase';
import {
  Add,
  ExitToApp,
  Home,
  Message,
  PeopleAlt,
  SearchOutlined,
} from '@material-ui/icons';
import { NavLink, Switch, Route } from 'react-router-dom';
import useRooms from '../hooks/useRooms';
import useUsers from '../hooks/useUsers';
import useChats from '../hooks/useChats';

export default function Sidebar({ user, page }) {
  const rooms = useRooms();
  const users = useUsers(user);
  const chats = useChats(user);

  const [menu, setMenu] = React.useState(1);
  const [searchResults, setSearchResults] = React.useState([]);

  function signOut() {
    auth.signOut();
  }

  function createRoom() {
    const roomName = prompt('Type the name of your room');
    if (roomName.trim()) {
      db.collection('rooms').add({
        name: roomName,
        timestamp: createTimestamp(),
      });
    }
  }

  async function searchUsersAndRooms(event) {
    event.preventDefault();
    const query = event.target.elements.search.value;
    const userSnapshot = await db
      .collection('users')
      .where('name', '==', query)
      .get();
    const roomSnapshot = await db
      .collection('rooms')
      .where('name', '==', query)
      .get();
    const userResults = userSnapshot.docs
      .map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      })
      .filter((foundUser) => foundUser.uid !== user.uid);
    const roomResults = roomSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const searchResults = [...userResults, ...roomResults];
    setMenu(4);
    setSearchResults(searchResults);
    event.target.reset();
  }

  let Nav;
  if (page.isMobile) {
    Nav = NavLink;
  } else {
    Nav = (props) => (
      <div
        className={`${props.isactiveclass ? 'sidebar__menu--selected' : ''}`}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    );
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
      <div className="sidebar__search">
        <form
          onSubmit={searchUsersAndRooms}
          className="sidebar__search--container"
        >
          <SearchOutlined />
          <input
            type="text"
            placeholder="Search for users or rooms"
            id="search"
          />
        </form>
      </div>
      <div className="sidebar__menu">
        <Nav
          to="/chats"
          onClick={() => setMenu(1)}
          isactiveclass={menu === 1 ? true : false}
          activeClassName="sidebar__menu--selected"
        >
          <div className="sidebar__menu--home">
            <Home style={{ fill: 'purple' }} />
            <div className="sidebar__menu--line" />
          </div>
        </Nav>
        <Nav
          to="/rooms"
          onClick={() => setMenu(2)}
          isactiveclass={menu === 2 ? true : false}
          activeClassName="sidebar__menu--selected"
        >
          <div className="sidebar__menu--rooms">
            <Message style={{ fill: 'purple' }} />
            <div className="sidebar__menu--line" />
          </div>
        </Nav>
        <Nav
          to="/users"
          onClick={() => setMenu(3)}
          isactiveclass={menu === 3 ? true : false}
          activeClassName="sidebar__menu--selected"
        >
          <div className="sidebar__menu--users">
            <PeopleAlt style={{ fill: 'purple' }} />
            <div className="sidebar__menu--line" />
          </div>
        </Nav>
      </div>

      {page.isMobile ? (
        <Switch>
          <Route path="/chats">
            <SidebarList title="All Chats" data={chats} />
          </Route>
          <Route path="/rooms">
            <SidebarList title="Rooms" data={rooms} />
          </Route>
          <Route path="/users">
            <SidebarList title="Users" data={users} />
          </Route>
          <Route path="/search">
            <SidebarList title="Search Results" data={searchResults} />
          </Route>
        </Switch>
      ) : menu === 1 ? (
        <SidebarList title="All Chats" data={chats} />
      ) : menu === 2 ? (
        <SidebarList title="Rooms" data={rooms} />
      ) : menu === 3 ? (
        <SidebarList title="Users" data={users} />
      ) : menu === 4 ? (
        <SidebarList title="Search Results" data={searchResults} />
      ) : null}

      <div className="sidebar__chat--addRoom">
        <IconButton onClick={createRoom}>
          <Add />
        </IconButton>
      </div>
    </div>
  );
}
