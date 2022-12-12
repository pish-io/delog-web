const url = 'https://anyx.io';

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

  getUser = (username) =>
    new Promise((resolve, reject) => {
      const body = {
        id: 0,
        jsonrpc: '2.0',
        method: 'condenser_api.get_accounts',
        params: [[username]],
      };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          resolve(data.result[0]);
        })
        .catch((error) => reject(error));
    });
})();
