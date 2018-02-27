import fetchOKX from '../fetchOKX';

export default {
  get: id => fetchOKX(`communities/${id}`),
  index: () => fetchOKX('communities'),
};
