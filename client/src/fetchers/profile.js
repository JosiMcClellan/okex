import account from '../App/localAccount';

export default {
  get: slug => (
    account.authorizedFetch(`communities/${slug}/profile`)
  ),
  create: slug => (
    account.authorizedPost(`communities/${slug}/profile`)
  ),
};
