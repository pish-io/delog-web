const url = 'https://api.deathwing.me';
// const url = 'https://anyx.io';

function getBody(method, params) {
  const body = {
    id: 1,
    jsonrpc: '2.0',
    method: method,
    params: params,
  };
  return getRequestOptions(body);
}

function getRequestOptions(body) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export default new (class {
  getUserFromCacheServer = (username) =>
    new Promise((resolve, reject) => {
      const url = process.env.REACT_APP_CACHE_SERVER + `/v1/hive/accounts/${username}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });

  getAccount = (username) =>
    new Promise((resolve, reject) => {
      const body = getBody('condenser_api.get_accounts', [[username]]);
      fetch(url, body)
        .then((response) => response.json())
        .then((data) => {
          resolve(data.result[0]);
        })
        .catch((error) => reject(error));
    });

  getAccountPosts = (username, sort, limit, start_author, start_permlink) =>
    new Promise((resolve, reject) => {
      const body = getBody('bridge.get_account_posts', {
        account: username,
        sort: sort,
        limit: limit,
        start_author: start_author,
        start_permlink: start_permlink,
        observer: null,
      });
      fetch(url, body)
        .then((response) => response.json())
        .then((data) => {
          resolve(data.result);
        })
        .catch((error) => reject(error));
    });

  getFollowCount = (username) =>
    new Promise((resolve, reject) => {
      const body = getBody('condenser_api.get_follow_count', [username]);
      fetch(url, body)
        .then((response) => response.json())
        .then((data) => {
          resolve(data.result);
        })
        .catch((error) => reject(error));
    });

  getRelationshipBetweenAccounts = (username, signinUserName) =>
    new Promise((resolve, reject) => {
      const body = getBody('bridge.get_relationship_between_accounts', [signinUserName, username]);
      fetch(url, body)
        .then((response) => response.json())
        .then((data) => {
          resolve(data.result);
        })
        .catch((error) => reject(error));
    });
})();
