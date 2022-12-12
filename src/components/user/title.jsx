import Link from 'next/link';
import { Avatar } from 'antd';

const UserTitle = ({ user }) => {
  return (
    <div>
      <Link href="/">
        <a>
          <Avatar src="/favicon-180x180.png" />
        </a>
      </Link>
      <span className="ml-1 mr-2">/</span>
      <span style={{ fontSize: '1.3rem' }}>{user.name}</span>
    </div>
  );
};

export default UserTitle;
