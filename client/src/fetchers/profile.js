import fetchOKX from '../fetchOKX';

export default {
  get: (slug, token) => (
    fetchOKX.withToken(token, `communities/${slug}/profile`)
  ),
  create: (slug, token) => (
    fetchOKX.withToken(token, `communities/${slug}/profile`, {
      method: 'POST',
    })
  ),
};
