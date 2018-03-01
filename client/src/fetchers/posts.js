import account from '../App/localAccount';

export default {
  create: (slug, discussionId, body) => (
    account.post(`communities/${slug}/discussions/${discussionId}/posts`, { body })
  ),
};
