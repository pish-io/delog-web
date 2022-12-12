import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from 'pages/main';
import UserMain from 'pages/user/main';
import PostDetail from 'pages/post/detail';
import Toast from './components/common/Toast';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="tag">
          <Route path=":path2">
            <Route path="hot" element={<Main />} />
            <Route path="trending" element={<Main />} />
            <Route path="latest" element={<Main />} />
          </Route>
        </Route>
        <Route path="@:path1" element={<UserMain />}></Route>
        <Route path="@:path1/feeds" element={<UserMain />}></Route>
        <Route path="@:path1/blogs" element={<UserMain />}></Route>
        <Route path="@:path1/:path2" element={<PostDetail />}></Route>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
    <Toast />
  </React.StrictMode>
);
