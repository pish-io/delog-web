// import useSWR from 'swr';
import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar';

const avatarSize = 8;

// function getProfileImage(user) {
//   if (
//     user.posting_json_metadata &&
//     user.posting_json_metadata.profile &&
//     user.posting_json_metadata.profile.profile_image
//   ) {
//     return (
//       'https://api.delog.io/api/v1/images/avatar?url=' +
//       encodeURIComponent(user.posting_json_metadata.profile.profile_image)
//     );
//   }
// }

// function getTempAvatar(pulse) {
//   return (
//     <svg
//       className={`w-8 h-8 text-gray-200 ${pulse}`}
//       aria-hidden="true"
//       fill="currentColor"
//       viewBox="0 0 20 20"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         fillRule="evenodd"
//         d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
//         clipRule="evenodd"
//       ></path>
//     </svg>
//   );
// }

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
// const options = { revalidateOnFocus: false };

function getProfileImageFromHive(name) {
  return `https://images.hive.blog/u/${name}/avatar/small`;
}

export default function PostAvatar({ username }) {
  // const url = process.env.REACT_APP_CACHE_SERVER + `/hive/users/${username}`;
  // const { data, error } = useSWR(url, fetcher, options);
  // if (error) return getTempAvatar();
  // if (!data) return getTempAvatar('animate-pulse');
  return (
    <Link to={`/@${username}`}>
      <Avatar src={getProfileImageFromHive(username)} alt={username} size={avatarSize}></Avatar>
    </Link>
  );
}
