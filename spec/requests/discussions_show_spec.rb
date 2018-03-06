require_relative 'request_spec_helper'

describe 'discussions#show' do
  let!(:community) { create(:community) }
  let!(:account) { create(:account) }
  let!(:discussion) { create(:discussion, community: community) }

  it %{
    if the account doesn't have a profile for the community,
      it sends a forbidden error.
  } do
    get(
      api_v1_discussion_path(community, discussion),
      headers: token_header(account)
    )
    expect_status 403
    expect_shape :error
  end

  it %{
    if the discussion doesnt exist,
      it it sends a not found error.
  } do
    create(:profile, account: account, community: community)
    get(
      api_v1_discussion_path(community, -1),
      headers: token_header(account)
    )
    expect_status 404
    expect_shape :error
  end

  it %{
    if the account has a profile for the community,
      it sends the discussion, including:
        topic
        started
        active
        posts
  } do
    create(:profile, account: account, community: community)
    get(
      api_v1_discussion_path(community, discussion),
      headers: token_header(account)
    )
    expect_status 200
    expect_shape(
      :id,
      :topic,
      :started,
      :active,
      :posts
    )
  end
end
