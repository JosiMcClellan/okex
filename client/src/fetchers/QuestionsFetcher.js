import account from '../App/localAccount';

export default class {
  constructor(slug) {
    this.path = `/communities/${slug}/questions/`;
  }
  index = () => (
    account.authorizedFetch(this.path)
  );
  update = (id, updates) => (
    account.authorizedPut(this.path + id, updates)
  );
}
