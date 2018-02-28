import fetchOKX from '../fetchOKX';

export default {
  fetchWithToken(path, options) {
    const { token } = this.load();
    const header = new Headers({ Authorization: `Token ${token}` });
    return fetchOKX(path, { headers: header, ...options });
  },
  stored() {
    return localStorage.getItem('account');
  },
  load() {
    const stored = this.stored();
    return stored && JSON.parse(stored);
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
