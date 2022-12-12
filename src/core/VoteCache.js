export default new (class {
  addVote(author, permlink, voter) {
    const maxSize = 99;
    let cache = this.getVotes();
    const tempObj = { author: author, permlink: permlink, voter: voter };
    if (cache) {
      cache.unshift(tempObj);
      if (cache.length > maxSize) {
        cache.pop();
      }
      localStorage.setItem('votedList', JSON.stringify(cache));
    } else {
      localStorage.setItem('votedList', JSON.stringify([tempObj]));
    }
  }

  getVotes() {
    const cache = localStorage.getItem('votedList');
    return JSON.parse(cache ? cache : null);
  }
})();
