import { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Layout, Left, Right } from 'components/layout/Layout';
import TopLayer from 'components/main/top/TopLayer';
import Marked from 'util/marked';
import Post from 'client/hive/post';
import BottomLayer from 'components/post/BottomLayer';
import VoteCache from 'core/VoteCache';

function setHtmlTitle(post) {
  const htmlTitle = document.querySelector('title');
  htmlTitle.innerText = post.title;

  const bodyText = getBodyText(post.body);
  const finalText = bodyText.substring(0, 120);
  const el = document.querySelector("meta[name='description']");
  el.setAttribute('content', finalText);
}

function getBodyText(body) {
  const tempBody = body.substring(0, 1500);
  return Marked.getPlainText(tempBody);
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

function divier() {
  return (
    <div className="mb-5 divide-y divide-gray-200">
      <div></div>
      <div></div>
    </div>
  );
}

export default function PostDetail({}) {
  const location = useLocation();
  const splits = location.pathname.split('/');
  const author = splits[1].split('@')[1];
  const permlink = splits[2];
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (location.state && location.state.post) {
      const votedCache = VoteCache.getVotes();
      if (votedCache) {
        // vote status update from cached data
        const find = votedCache.filter(
          (item) =>
            item.author === location.state.post.author &&
            item.permlink === location.state.post.permlink
        );
        if (find.length) {
          location.state.post.active_votes.push({ voter: find[0].voter });
        }
      }

      setPost(location.state.post);
      setHtmlTitle(location.state.post);
    } else {
      getPost();
    }
  }, [author, permlink]);

  const getPost = async () => {
    const getPost = await Post.getPost(author, permlink);
    if (getPost) {
      setPost(getPost);
      setHtmlTitle(getPost);
    }
  };

  if (!post)
    return (
      <div>
        <TopLayer location={location}></TopLayer>
        <Layout>
          <Left>
            <div className="mt-20 h-screen">
              <div className="animate-pulse">
                <div className="w-48 h-3.5 mb-4 bg-gray-300 dark:bg-gray-600"></div>
                <div className="mt-10 h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
                <div className="mt-10 h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          </Left>
          <Right></Right>
        </Layout>
      </div>
    );
  return (
    <div>
      <TopLayer location={location}></TopLayer>
      <Layout>
        <Left>
          <h1 className="mt-10 text-4xl font-semibold font-helvetica">{post.title}</h1>
          <div className="font-helvetica">
            <Link to={`/@${post.author}`}>{post.author}</Link>
            <small className="ml-3 text-gray-500">{post.created}</small>
          </div>
          <div
            className="font-helvetica mb-12"
            dangerouslySetInnerHTML={{ __html: Marked.getHtmlText(post.body) }}
          />
          {divier()}
          <BottomLayer data={getBottomLayerData(post)} hideAvatar={true}></BottomLayer>
          <div className="mt-6 mb-28">{divier()}</div>
        </Left>
        <Right></Right>
      </Layout>
    </div>
  );
}
