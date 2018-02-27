import localAccount from '../App/localAccount';

export default {
  get: id => (
    localAccount.fetchWithToken(`discussions/${id}`)
  ),
  index: slug => (
    localAccount.fetchWithToken(`communities/${slug}/discussions`)
  ),
};
