require_relative 'request_spec_helper'

describe 'profiles#create', :type => :request do
  let!(:community) { create(:community) }
  let!(:account) { create(:account) }

  it %{
    if there is no community
      it returns an error message.
  } do
    post(
      api_v1_profile_path('fake-slug'),
      headers: token_header(account)
    )
    expect_shape(:error)
    expect(response).to be_not_found
  end

  it %{
    if there is no account
      it returns an error message.
  } do
    post api_v1_profile_path(community)
    expect_shape :error
    expect(response).to be_unauthorized
  end

  it %{
    if there is an account and profile
      it creates and renders the profile including:
        handle
        community
  } do
    post(
      api_v1_profile_path(community),
      headers: token_header(account)
    )
    expect_shape :handle, :community
    expect(response).to be_created
  end
end
