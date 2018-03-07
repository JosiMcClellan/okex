import account from '../App/localAccount';

export default {
  create: (slug, discussionId, body) => (
    account.authorizedPost(`communities/${slug}/discussions/${discussionId}/posts`, { body })
  ),
};
