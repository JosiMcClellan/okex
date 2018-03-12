import account from '../App/localAccount';

export default class {
  constructor(slug, discussionId) {
    this.path = `communities/${slug}/discussions/${discussionId}/posts`;
  }
  create = body => account.authorizedPost(this.path, { body });
}
