import account from '../App/localAccount';

export default {
  create: (slug, discussionId) => (
    account.fetchWithToken(
      `communities/${slug}/discussions/${discussionId}/posts`,
      { method: 'POST' },
    )
  ),
};
