import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TagList({ location }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  async function asyncFetch() {
    const url = process.env.REACT_APP_CACHE_SERVER + `/v1/hive/tags`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
      });
  }

  function getHref(tagName) {
    if (location.pathname.includes('/tag')) {
      if (location.pathname.includes('/hot')) {
        return `/tag/${tagName}/hot`;
      } else if (location.pathname.includes('/trending')) {
        return `/tag/${tagName}/trending`;
      } else if (location.pathname.includes('/latest')) {
        return `/tag/${tagName}/latest`;
      }
    } else {
      return `/tag/${tagName}/hot`;
    }
  }

  function getTags() {
    if (tags.length) {
      return tags.map((item, index) => (
        <a
          href={getHref(item.name)}
          key={index}
          className="m-1 bg-gray-200 hover:bg-gray-300 text-gray-1000 text-sm   mr-2 px-2 py-0.3 rounded dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300"
        >
          {item.name}
        </a>
      ));
    } else {
      return <div />;
    }
  }

  return (
    <div className="font-helvetica" style={{ marginTop: '71px' }}>
      <h3 className="ml-2">Tags</h3>
      <div className="mt-2 flex flex-wrap ">{getTags()}</div>
    </div>
  );
}
