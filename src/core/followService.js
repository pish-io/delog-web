export default new (class {
  follow(client, following) {
    if (client.type === 'keychain') {
      return new Promise(function (resolve, reject) {
        window.hive_keychain.requestCustomJson(
          null,
          'follow',
          'Posting',
          JSON.stringify([
            'follow',
            { follower: client.username, following: following, what: ['blog'] },
          ]),
          'follow',
          (response) => {
            console.log(response);
            if (response.success) {
              resolve(response);
            } else {
              reject(response);
            }
          }
        );
      });
    }
  }

  unfollow(client, following) {
    if (client.type === 'keychain') {
      return new Promise(function (resolve, reject) {
        window.hive_keychain.requestCustomJson(
          null,
          'follow',
          'Posting',
          JSON.stringify(['follow', { follower: client.username, following: following, what: [] }]),
          'follow',
          (response) => {
            console.log(response);
            if (response.success) {
              resolve(response);
            } else {
              reject(response);
            }
          }
        );
      });
    }
  }
})();
