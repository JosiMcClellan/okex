import fetchOKX from '../fetchOKX';

export default {
  fetchWithToken(path, options) {
    const stored = this.load();
    if (!stored) return Promise.resolve(null);
    const header = new Headers({ Authorization: `Token ${stored.token}` });
    return fetchOKX(path, { headers: header, ...options });
  },
  post(path, data) {
    const stored = this.load();
    if (!stored) return Promise.resolve(null);
    const body = JSON.stringify(data);
    const headers = new Headers({
      Authorization: `Token ${stored.token}`,
      'Content-Type': 'application/json',
    });
    return fetchOKX(path, { headers, body, method: 'post' });
  },
  load() {
    const stored = localStorage.getItem('account');
    try {
      return stored && JSON.parse(stored);
    } catch (e) {
      console.log(e);
      this.destroy();
      return false;
    }
  },
  save(account) {
    localStorage.setItem('account', JSON.stringify(account));
  },
  destroy() {
    localStorage.removeItem('account');
  },
};

// import PropTypes from 'prop-types';
// class Account {
//   static fetchWithToken(path, options) {
//     const token = this.load().token;
//     const header = new Headers({ Authorization: `Token ${token}` });
//     return fetchOKX(path, { headers: header, ...options });
//   }
//   static shape = {
//     uid: PropTypes.string.isRequired,
//     token: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//   }
//   static load() {
//     const stored = localStorage.getItem('account');
//     if (!stored) return null;
//     return new this(JSON.parse(stored));
//   }
//   static create(code) {
//     return fetchOKX('account', {
//       method: 'POST',
//       headers: new Headers({
//         Authorization: `Bearer ${code}`,
//       }),
//     }).then((raw) => {
//       const wrapped = new this(raw);
//       wrapped.save();
//       return wrapped;
//     });
//   }
//   save() {
//     localStorage.setItem('account', JSON.stringify(this.raw));
//   }
//   constructor(data) {
//     this.raw = data;
//   }
//   get uid() { return this.raw.uid; }
//   get token() { return this.raw.token; }
//   get email() { return this.raw.email; }
// }
//
// export default Account;
