export default new (class {
  getClient() {
    const createKeychain = localStorage.getItem('keychain');
    return JSON.parse(createKeychain);
  }

  getUserName() {
    const keychain = JSON.parse(localStorage.getItem('keychain'));
    if (keychain) {
      return keychain.username;
    }
  }
})();
