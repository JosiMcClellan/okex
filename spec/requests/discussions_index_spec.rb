require_relative 'request_spec_helper'

describe 'discussions#index' do
  let!(:community) { create(:community) }
  let!(:account) { create(:account) }
  before { create_list(:discussion, 3, community: community) }

  it %{
    if the account doesn't have a profile for the community,
      it renders an error.
  } do
    get(
      api_v1_discussions_path(community),
      headers: token_header(account)
    )
    expect_shape :error
    expect(response).to be_forbidden
  end

  it %{
    if the account has a profile for the community,
      it renders all discussions, including:
        topic
        createdAt
        activeAt
  } do
    create(:profile, account: account, community: community)
    get(
      api_v1_discussions_path(community),
      headers: token_header(account)
    )
    expect_array_shape(3,
      :id,
      :topic,
      :createdAt,
      :activeAt,
      :posts
    )
    expect(response).to be_ok
  end
end
