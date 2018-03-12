import fetchOKX from '../fetchOKX';

const KEY = 'account';

export default {
  authorizedFetch(path, options) {
    const stored = this.load();
    if (!stored) return console.log('tried to fetch without account') || Promise.resolve(null);
    const headers = new Headers({
      Authorization: `Token ${stored.token}`,
      'Content-Type': 'application/json',
    });
    return fetchOKX(path, { headers, ...options });
  },
  authorizedPut(path, data) {
    const body = JSON.stringify(data);
    return this.authorizedFetch(path, { body, method: 'put' });
  },
  authorizedPost(path, data) {
    const body = JSON.stringify(data);
    return this.authorizedFetch(path, { body, method: 'post' });
  },
  load() {
    const stored = localStorage.getItem(KEY);
    try {
      return stored && JSON.parse(stored);
    } catch (e) {
      console.log(e);
      this.destroy();
    }
  },
  save(account) {
    if (!account) return console.log(`tried to save ${account} as account`);
    localStorage.setItem(KEY, JSON.stringify(account));
  },
  destroy() {
    console.log(KEY) || localStorage.removeItem(KEY);
  },
};
