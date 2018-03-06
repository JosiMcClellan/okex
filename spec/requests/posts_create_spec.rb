require_relative 'request_spec_helper'

describe 'posts#create' do
  let!(:community) { create(:community) }
  let!(:account) { create(:account) }
  let!(:discussion) { create(:discussion, community: community) }

  it %{
    if the account doesn't have a profile for the community,
      it sends a forbidden error.
  } do
    post(
      api_v1_discussion_posts_path(community, discussion),
      headers: token_header(account)
    )
    expect_status 403
    expect_shape :error
  end

  it %{
    if the account has a profile for the community,
      but no body param is supplied,
        it sends an unprocessable error.
  } do
    create(:profile, account: account, community: community)
    post(
      api_v1_discussion_posts_path(community, discussion),
      headers: token_header(account)
    )
    expect_status 422
    expect_shape :error
  end

  it %{
    if the account has a profile for the community,
      and a body param is supplied,
        it creates and sends the post, including:
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
    expect_status 201
    expect_shape(
      :id,
      :body,
      :posted
    )
  end
end
