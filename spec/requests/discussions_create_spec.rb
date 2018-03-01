require_relative 'request_spec_helper'

describe 'discussions#create' do
  let!(:community) { create(:community) }
  let!(:account) { create(:account) }

  it %{
    if the account doesn't have a profile for the community,
      it renders a forbidden error.
  } do
    post(
      api_v1_discussions_path(community),
      headers: token_header(account)
    )
    expect_shape :error
    expect(response).to be_forbidden
  end

  it %{
    if the account has a profile for the community,
      but no topic param is supplied,
        it renders an unprocessable error
  } do
    create(:profile, account: account, community: community)
    post(
      api_v1_discussions_path(community),
      headers: token_header(account)
    )
    expect_shape :error
    expect(response).to be_unprocessable
  end

  it %{
    if the account has a profile for the community,
      and there a topic param is supplied,
        it renders the discussion, including:
          topic
          started
          active
          posts
  } do
    create(:profile, account: account, community: community)
    post(
      api_v1_discussions_path(community),
      params: { topic: 'FOOBAR' },
      headers: token_header(account)
    )
    expect_shape(
      :id,
      :topic,
      :started,
      :active,
      :posts
    )
    expect(response).to be_created
  end
end
