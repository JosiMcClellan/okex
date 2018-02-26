import fetchOKX from '../../fetchOKX';

export default code => (
  fetchOKX('account', {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${code}`,
    }),
  })
);
