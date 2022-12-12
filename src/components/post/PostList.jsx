import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import PostCard from './PostCard';
import Post from 'client/hive/post';
import Global from 'client/hive/global';

export default function PostList({ location }) {
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
    getPosts();
  }, [page]);

  const getPosts = async () => {
    setLoading(true);
    console.log('getPosts');
    if (!global) {
      const global = await Global.getDynamicGlobalProperties();
      setGlobal(global);
    }

    const path3 = location.pathname.split('/')[3];
    const path2 = location.pathname.split('/')[2];
    let sort = path3 === 'latest' ? 'created' : path3;
    sort = sort ? sort : 'hot';
    let tag = path2 ? path2 : '';
    tag = tag === '*' ? '' : tag;
    console.log('posts.length', posts.length);

    const getRankedPosts = await Post.getRankedPosts(
      sort,
      tag,
      page.start_author,
      page.start_permlink
    );
    if (getRankedPosts.length) {
      setPosts((prevState) => [...prevState, ...getRankedPosts]);
    }
    setLoading(false);
  };

  // if (error) return <div>error</div>;
  if (!posts.length)
    return (
      <div ref={ref} className="mt-10 ml-10 h-screen">
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
    <PostCard key={index} post={post} global={global} />
  ));
  return (
    <div className="mt-7">
      {postItems}
      <div ref={ref}></div>
    </div>
  );
}
