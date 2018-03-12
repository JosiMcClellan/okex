import account from '../App/localAccount';

export default class {
  constructor(slug) {
    this.path = `communities/${slug}/profile_fields/`;
  }
  update = (promptId, body) => (
    account.authorizedPut(this.path + promptId, { body })
  );
}
