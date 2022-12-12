const url = 'https://api.deathwing.me';

const DEFAULT_LIMT = 5;

export default new (class {
  getRankedPosts = (sort, tag, start_author, start_permlink) =>
    new Promise((resolve, reject) => {
      const body = {
        id: 0,
        jsonrpc: '2.0',
        method: 'bridge.get_ranked_posts',
        params: {
          tag: tag,
          sort: sort,
          limit: DEFAULT_LIMT,
          start_author: start_author,
          start_permlink: start_permlink,
          observer: null,
        },
      };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          resolve(data.result);
        })
        .catch((error) => reject(error));
    });

  getPost = (username, permlink) =>
    new Promise((resolve, reject) => {
      const body = {
        id: 1,
        jsonrpc: '2.0',
        method: 'bridge.get_post',
        params: {
          author: username,
          permlink: permlink,
          observer: null,
        },
      };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          resolve(data.result);
        })
        .catch((error) => reject(error));
    });
})();
