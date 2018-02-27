import fetchOKX from '../fetchOKX';

export default {
  create: code => (
    fetchOKX('account', {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${code}`,
      }),
    })
  ),
};
