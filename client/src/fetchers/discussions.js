import account from '../App/localAccount';

export default {
  get: (slug, id) => (
    account.authorizedFetch(`communities/${slug}/discussions/${id}`)
  ),
  index: slug => (
    account.authorizedFetch(`communities/${slug}/discussions`)
  ),
  create: (slug, topic) => account.authorizedPost(`communities/${slug}/discussions`, { topic }),
};
