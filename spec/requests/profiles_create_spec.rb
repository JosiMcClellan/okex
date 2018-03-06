require_relative 'request_spec_helper'

describe 'profiles#create', :type => :request do
  let!(:community) { create(:community) }
  let!(:account) { create(:account) }

  it %{
    if there is no community
      it returns sends a not found error.
  } do
    post(
      api_v1_profile_path('fake-slug'),
      headers: token_header(account)
    )
    expect_status 404
    expect_shape(:error)
  end

  it %{
    if there is no account
      it sends an unauthorized error.
  } do
    post api_v1_profile_path(community)
    expect_shape :error
    expect(response).to be_unauthorized
  end

  it %{
    if there is an account and community
      it creates and sends a profile including:
        handle
        community
  } do
    post(
      api_v1_profile_path(community),
      headers: token_header(account)
    )
    expect_status 201
    expect_shape :handle, :community
  end
end
