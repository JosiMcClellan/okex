import account from '../App/localAccount';

export default class {
  constructor(slug) {
    this.path = `communities/${slug}/profile`;
  }
  get = () => account.authorizedFetch(this.path)
  create = handle => account.authorizedPost(this.path, { handle });
}
