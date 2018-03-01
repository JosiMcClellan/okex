import account from '../App/localAccount';

export default {
  get: slug => (
    account.fetchWithToken(`communities/${slug}/profile`)
  ),
  create: slug => (
    account.fetchWithToken(`communities/${slug}/profile`, {
      method: 'POST',
    })
  ),
};
