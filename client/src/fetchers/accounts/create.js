import fetchOKX from '../../fetchOKX';

export default code => fetchOKX('accounts', {
  method: 'POST',
  headers: new Headers({
    Authorization: code,
  }),
});
