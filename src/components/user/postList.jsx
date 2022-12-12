import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import User from 'client/hive/user';
import PostCard from '../post/PostCard';
import Global from 'client/hive/global';

export default function PostList({ username, location }) {
  const [posts, setPosts] = useState([]);
  const [global, setGlobal] = useState(null);
  const [page, setPage] = useState({ start_author: null, start_permlink: null });
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '450px',
  });

  useEffect(() => {
    setPosts([]);
  }, [location.pathname]);

  useEffect(() => {
    if (inView && !loading) {
      const start_author = posts.length ? posts[posts.length - 1].author : null;
      const start_permlink = posts.length ? posts[posts.length - 1].permlink : null;
      setPage({ start_author: start_author, start_permlink: start_permlink });
    }
  }, [inView]);

  useEffect(() => {
    getAccountPosts();
  }, [page]);

  const getAccountPosts = async () => {
    setLoading(true);
    console.log('getAccountPosts');
    if (!global) {
      const global = await Global.getDynamicGlobalProperties();
      setGlobal(global);
    }

    let sort = 'posts';
    let limit = 5;
    if (location.pathname.includes('/feed')) {
      sort = 'feed';
      limit = 4;
    } else if (location.pathname.includes('/blog')) {
      sort = 'blog';
    }
    const getAccountPosts = await User.getAccountPosts(
      username,
      sort,
      limit,
      page.start_author,
      page.start_permlink
    );
    if (getAccountPosts.length) {
      setPosts((prevState) => [...prevState, ...getAccountPosts]);
    }
    setLoading(false);
  };

  if (!posts.length)
    return (
      <div ref={ref} className="mt-20 h-screen">
        <div className="animate-pulse">
          <div className="w-48 h-3.5 mb-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
        </div>

        <div className="mt-10 animate-pulse">
          <div className="w-48 h-3.5 mb-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
        </div>

        <div className="mt-10 animate-pulse">
          <div className="w-48 h-3.5 mb-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    );

  const postItems = posts.map((post, index) => (
    <PostCard key={index} post={post} global={global} hideAvatar={true} />
  ));
  return (
    <div className="mt-7">
      {postItems}
      <div ref={ref}></div>
    </div>
  );
}
