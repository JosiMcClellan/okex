require_relative 'request_spec_helper'

describe 'profiles#show', :type => :request do
  let!(:community) { create(:community) }
  let!(:account) { create(:account) }

  it %{
    if there is not a profile for that account/community pair
      it sends a forbidden error.
  } do
    get(
      api_v1_profile_path(community),
      headers: token_header(account)
    )
    expect_status 403
    expect_shape :error
  end

  it %{
    if there is a profile for that account/community pair
      it sends a profile including:
        handle
        community
  } do
    create(:profile, account: account, community: community)
    get(
      api_v1_profile_path(community),
      headers: token_header(account)
    )
    expect_status 200
    expect_shape :handle, :community
  end
end
