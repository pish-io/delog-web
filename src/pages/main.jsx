import { useLocation, useParams } from 'react-router-dom';

import { Layout, Left, Right } from 'components/layout/Layout';

import TopLayer from 'components/main/top/TopLayer';
import PostList from 'components/post/PostList';
import TagList from 'components/post/TagList';
import MainTab from 'components/main/MainTab';

function setHtmlTitle(title) {
  const htmlTitle = document.querySelector('title');
  htmlTitle.innerText = title;
}

function App() {
  let location = useLocation();
  location.query = useParams();
  setHtmlTitle('DeLOG');

  return (
    <div>
      <TopLayer location={location}></TopLayer>
      <Layout>
        <Left>
          <MainTab location={location}></MainTab>
          <PostList location={location}></PostList>
        </Left>
        <Right>
          <TagList location={location}></TagList>
        </Right>
      </Layout>
    </div>
  );
}

export default App;
