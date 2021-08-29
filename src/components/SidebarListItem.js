import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function SidebarListItem({ title, item }) {
  return (
    <Link to={`/room/${item.id}`} className="link">
      <div className="sidebar__chat">
        <div className="avatar__container">
          <Avatar
            style={{ width: 45, height: 45 }}
            src={
              item.photoUrl ||
              (title === 'Rooms' || title === 'Chats'
                ? `https://ui-avatars.com/api/?name=${item.name}&length=3&background=800080&color=fff`
                : `https://avatars.dicebear.com/api/human/${item.name}.svg`)
            }
          />
        </div>
        <div className="sidebar__chat--info">
          <h2>{item.name}</h2>
        </div>
      </div>
    </Link>
  );
}
