require_relative 'request_spec_helper'

describe 'profiles#show' do
  let(:community){ create(:community) }
  let(:account){ create(:account) }
  let(:header){ token_header(account.token) }
  let(:path){ "/api/v1/communities/#{community.slug}/profile" }

  context 'if there is no community' do
    specify 'it sends a not found error' do
      post('/api/v1/communities/fake-slug/profile')
      expect_error 404
    end
  end

  context 'if there is no account' do
    specify 'it sends an unauthorized error' do
      post(path)
      expect_error 401
    end
  end

  context 'if the account already has a profile for that community' do
    specify 'it sends an unprocessable error' do
      create(:profile, account: account, community: community)
      post(path, headers: header)
      expect_error 422
    end
  end

  context 'if the account has no profile for that community' do
    specify 'it creates and sends a profile with id, handle, and fields' do
      post(path, headers: header)
      expect_response 201, {
        id: Integer,
        handle: String,
        fields: [
          id: Integer,
          prompt: String
        ],
        questions: [
          id: Integer,
          prompt: String
        ]
      }
    end
  end
end
