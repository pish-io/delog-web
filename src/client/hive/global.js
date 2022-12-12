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
  getDynamicGlobalProperties = (username, signinUserName) =>
    new Promise((resolve, reject) => {
      const body = getBody('condenser_api.get_dynamic_global_properties', []);
      fetch(url, body)
        .then((response) => response.json())
        .then((data) => {
          resolve(data.result);
        })
        .catch((error) => reject(error));
    });
})();
