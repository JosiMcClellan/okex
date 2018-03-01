require_relative 'request_spec_helper'

describe 'posts#create' do
  let!(:community) { create(:community) }
  let!(:account) { create(:account) }
  let!(:discussion) { create(:discussion, community: community) }

  it %{
    if the account doesn't have a profile for the community,
      it renders a forbidden error.
  } do
    post(
      api_v1_discussion_posts_path(community, discussion),
      headers: token_header(account)
    )
    expect_shape :error
    expect(response).to be_forbidden
  end

  it %{
    if the account has a profile for the community,
      but no body param is supplied,
        it renders an unprocessable error.
  } do
    create(:profile, account: account, community: community)
    post(
      api_v1_discussion_posts_path(community, discussion),
      headers: token_header(account)
    )
    expect_shape :error
    expect(response).to be_unprocessable
  end

  it %{
    if the account has a profile for the community,
      and a body param is supplied,
        it renders the discussion, including:
          id,
          body,
          posted
  } do
    create(:profile, account: account, community: community)
    post(
      api_v1_discussion_posts_path(community, discussion),
      params: { body: 'whatever' },
      headers: token_header(account)
    )
    expect_shape(
      :id,
      :body,
      :posted
    )
    expect(response).to be_created
  end
end
