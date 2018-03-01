import account from '../App/localAccount';

export default {
  get: (slug, id) => (
    account.fetchWithToken(`communities/${slug}/discussions/${id}`)
  ),
  index: slug => (
    account.fetchWithToken(`communities/${slug}/discussions`)
  ),
  create: slug => (
    account.fetchWithToken(`communities/${slug}/discussions`, {
      method: 'POST',
    })
  ),
};
