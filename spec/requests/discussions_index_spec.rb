require_relative 'request_spec_helper'

describe 'discussions#index' do
  let(:community) { create(:community) }
  let(:account) { create(:account) }
  let(:path) { api_v1_discussions_path(community) }
  let(:header) { token_header(account.token) }

  before { create_list(:discussion, 2, community: community) }

  context 'if the account has no profile for the community' do
    specify 'it sends a forbidden error' do
      get(path, headers: header)
      expect_error 403
    end
  end

  context 'if the account does have a profile for the community' do
    specify 'it sends all discussions with topic, started, active' do
      create(:profile, account: account, community: community)
      get(path, headers: header)
      expect_response(200, [{
        id: Integer,
        topic: String,
        started: String,
        active: String,
        posts: [{
          id: Integer,
          body: String,
          posted: String
        }]
      }])
    end
  end
end
