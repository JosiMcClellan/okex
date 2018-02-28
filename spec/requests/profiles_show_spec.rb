require_relative 'request_spec_helper'

describe 'profiles#show', :type => :request do
  let! :community { create(:community) }
  let! :account { create(:account) }

  it %{
    if there is not a profile for that account/community pair
      it returns an error message.
  } do
    get(
      api_v1_profile_path(community),
      headers: token_header(account)
    )
    expect_shape :error
    expect(response).to be_not_found
  end

  it %{
    if there is a profile for that account/community pair
      it renders the profile including:
        handle
        community
  } do
    create(:profile, account: account, community: community)
    get(
      api_v1_profile_path(community),
      headers: token_header(account)
    )
    expect_shape :handle, :community
    expect(response).to be_ok
  end
end
