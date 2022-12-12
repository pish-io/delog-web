import VoteCache from './VoteCache';
export default new (class {
  executeVote(client, author, permlink, votingPercent) {
    if (client.type === 'keychain') {
      return new Promise(function (resolve, reject) {
        window.hive_keychain.requestVote(
          client.username,
          permlink,
          author,
          votingPercent * 100,
          (response) => {
            if (response.success) {
              resolve(response);
              VoteCache.addVote(author, permlink, client.username);
            } else {
              reject(response);
            }
          }
        );
      });
    }
  }

  issueToken(username, votingPercent) {
    const url = process.env.REACT_APP_CACHE_SERVER + `/v1/hive-engine/tokens/issue`;
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, votingPercent: votingPercent }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            resolve(data);
          } else {
            reject(data);
          }
        });
    });
  }
})();
