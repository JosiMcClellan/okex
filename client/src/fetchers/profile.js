import localAccount from '../App/localAccount';

export default {
  get: slug => (
    localAccount.fetchWithToken(`communities/${slug}/profile`)
  ),
  create: slug => (
    localAccount.fetchWithToken(
      `communities/${slug}/profile`,
      { method: 'POST' },
    )
  ),
};
