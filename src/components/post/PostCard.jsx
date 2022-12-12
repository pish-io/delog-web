import { Link } from 'react-router-dom';

import BottomLayer from './BottomLayer';
import PostAvatar from './PostAvatar';
import Marked from 'util/marked';
import Date from 'util/date';

function top(post, global, hideAvatar) {
  return (
    <div className="flex items-center gap-2 ">
      {!hideAvatar && <PostAvatar username={post.author}></PostAvatar>}
      <div>
        <Link to={`/@${post.author}`}>
          <strong className="text-gray-500 font-normal" style={{ fontSize: '0.9rem' }}>
            {post.author}
          </strong>
        </Link>
        <span className="ml-2 text-gray-700 font-normal" style={{ fontSize: '0.67rem' }}>
          {Date.timeAgo(global.time, post.created)}
        </span>
      </div>
    </div>
  );
}

function divier() {
  return (
    <div className="ml-10 divide-y divide-gray-100">
      <div className="mt-6"></div>
      <div></div>
    </div>
  );
}
// https://images.hive.blog/256x512/https://ipfs-3speak.b-cdn.net/ipfs/bafkreih5thradbjna2ye7dfxedtgoi2yr6vpoxqkalxl6wsn5dabcyxyge
function getThumbnailImage(post) {
  if (post.json_metadata.image && post.json_metadata.image.length) {
    return (
      <img
        className="object-cover w-full h-16 sm:h-20 lg:h-24 xl:h-32"
        src={'https://images.hive.blog/600x900/' + encodeURIComponent(post.json_metadata.image[0])}
        alt={post.title}
      ></img>
    );
  }
}

function getBodyText(body) {
  const tempBody = body.substring(0, 1500);
  return Marked.getPlainText(tempBody);
}

function getPostLink(post) {
  return `/@${post.author}/${post.permlink}`;
}

function getBottomLayerData(post) {
  return {
    author: post.author,
    permlink: post.permlink,
    active_votes: post.active_votes,
    stats: post.stats,
    replies: post.replies,
    pending_payout_value: post.pending_payout_value,
    payout: post.payout,
    children: post.children,
  };
}

export default function PostCard({ post, global, hideAvatar }) {
  return (
    <div className="mt-3 font-helvetica">
      {top(post, global, hideAvatar)}
      <div className={`flex justify-between ${!hideAvatar ? 'ml-10' : ''}`}>
        <div className="w-17/24 sm:w-9/12">
          <Link to={getPostLink(post)} state={{ post: post }}>
            <h2
              className="text-xl break-all font-bold dark:text-white"
              style={{ fontSize: '1.3rem' }}
            >
              {post.title}
            </h2>
            <p
              className="hidden sm:inline-block sm:line-clamp-3 mt-2"
              style={{ fontSize: '1.03rem' }}
            >
              {getBodyText(post.body)}
            </p>
          </Link>
        </div>
        <div className="w-7/24 sm:w-3/12 ml-2 sm:ml-3">
          <Link to={getPostLink(post)} state={{ post: post }}>
            {getThumbnailImage(post)}
          </Link>
        </div>
      </div>
      <Link to={getPostLink(post)} state={{ post: post }}>
        <p
          className={`sm:hidden line-clamp-3 mt-2  ${!hideAvatar ? 'ml-10' : ''}`}
          style={{ fontSize: '1.03rem' }}
        >
          {getBodyText(post.body)}
        </p>
      </Link>
      <BottomLayer data={getBottomLayerData(post)} hideAvatar={hideAvatar}></BottomLayer>
      {divier()}
    </div>
  );
}
