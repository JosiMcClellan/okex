require_relative 'request_spec_helper'

describe 'discussions#create' do
  let!(:community) { create(:community) }
  let!(:account) { create(:account) }

  it %{
    if the account doesn't have a profile for the community,
      it sends a forbidden error.
  } do
    post(
      api_v1_discussions_path(community),
      headers: token_header(account)
    )
    expect_status 403
    expect_shape :error
  end

  it %{
    if the account has a profile for the community,
      but no topic param is supplied,
        it sends an unprocessable error
  } do
    create(:profile, account: account, community: community)
    post(
      api_v1_discussions_path(community),
      headers: token_header(account)
    )
    expect_status 422
    expect_shape :error
  end

  it %{
    if the account has a profile for the community,
      and there a topic param is supplied,
        it creates and sends the discussion, including:
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
    expect_status 201
    expect_shape(
      :id,
      :topic,
      :started,
      :active,
      :posts
    )
  end
end
