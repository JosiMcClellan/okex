require_relative 'request_spec_helper'

describe 'discussions#show' do
  let! :community { create(:community) }
  let! :discussion { create(:discussion, community: community) }
  let! :account { create(:account) }

  it %{
    if the account doesn't have a profile for the community,
      it renders an error.
  } do
    get(
      api_v1_discussion_path(community, discussion),
      headers: token_header(account)
    )
    expect_shape :error
    expect(response).to be_forbidden
  end

  it %{
    if the discussion doesnt exist,
      it renders an error.
  } do
    create(:profile, account: account, community: community)
    get(
      api_v1_discussion_path(community, -1),
      headers: token_header(account)
    )
    expect_shape :error
    expect(response).to be_not_found
  end

  it %{
    if the account has a profile for the community,
      it renders the discussion, including:
        topic
        createdAt
        activeAt
        posts
  } do
    create(:profile, account: account, community: community)
    get(
      api_v1_discussion_path(community, discussion),
      headers: token_header(account)
    )
    expect_shape(
      :id,
      :topic,
      :createdAt,
      :activeAt,
      :posts
    )
    expect(response).to be_ok
  end
end
