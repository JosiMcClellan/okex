require_relative 'request_spec_helper'

describe 'profiles#show' do
  let(:community){ create(:community) }
  let(:account){ create(:account) }
  let(:header){ token_header(account.token) }
  let(:path){ "/api/v1/communities/#{community.slug}/profile" }

  context 'if there is no community' do
    specify 'it sends a not found error' do
      get('/api/v1/communities/fake-slug/profile')
      expect_error 404
    end
  end

  context 'if there is no account' do
    specify 'it sends an unauthorized error' do
      get(path)
      expect_error 401
    end
  end

  context 'if the account has no profile for that community' do
    specify 'it sends a forbidden error' do
      get(path, headers: header)
      expect_error 403
    end
  end

  context 'if the account has a profile for that community' do
    specify 'it sends a profile including id, handle, and fields' do
      create(:profile, account: account, community: community)
      get(path, headers: header)
      expect_response 200, {
        id: Integer,
        handle: String,
        fields: [
          id: Integer,
          prompt: String,
          response: ShapeExpecter.optional(String)
        ]
      }
    end
  end
end
