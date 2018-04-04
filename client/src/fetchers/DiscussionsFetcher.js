import account from '../App/localAccount';

export default class {
  constructor(slug) {
    this.path = `/communities/${slug}/discussions/`;
  }
  index = () => account.authorizedFetch(this.path);
  get = id => account.authorizedFetch(this.path + id);
  create = topic => account.authorizedPost(this.path, { topic });
}
