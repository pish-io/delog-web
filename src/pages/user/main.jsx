import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { Layout, Left, Right } from 'components/layout/Layout';

import TopLayer from 'components/main/top/TopLayer';
import PostList from 'components/user/postList';

import UserProfile from 'components/user/profile';
import UserTab from 'components/user/userTab';

function App() {
  const location = useLocation();
  const username = location.pathname.split('/@')[1].split('/')[0];

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerText = username + ' - DeLOG';
  }, [username]);

  return (
    <div>
      <TopLayer location={location}></TopLayer>
      <Layout>
        <Left>
          <UserProfile username={username}></UserProfile>
          <UserTab location={location}></UserTab>
          <PostList username={username} location={location}></PostList>
        </Left>
        <Right></Right>
      </Layout>
    </div>
  );
}

export default App;
