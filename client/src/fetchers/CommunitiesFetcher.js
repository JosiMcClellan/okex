import fetchOKX from '../fetchOKX';

export default class {
  index = () => fetchOKX('communities');
  get = id => fetchOKX(`communities/${id}`);
}
