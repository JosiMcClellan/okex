require_relative 'request_spec_helper'

describe 'discussions#index' do
  let!(:community) { create(:community) }
  let!(:account) { create(:account) }
  before { create_list(:discussion, 3, community: community) }

  it %{
    if the account doesn't have a profile for the community,
      it sends a forbidden error.
  } do
    get(
      api_v1_discussions_path(community),
      headers: token_header(account)
    )
    expect_status 403
    expect_shape :error
  end

  it %{
    if the account has a profile for the community,
      it sends all discussions, including:
        topic
        started
        active
  } do
    create(:profile, account: account, community: community)
    get(
      api_v1_discussions_path(community),
      headers: token_header(account)
    )
    expect_status 200
    expect_array_shape(
      3,
      :id,
      :topic,
      :started,
      :active,
      :posts
    )
  end
end
