require_relative 'request_spec_helper'

describe 'discussions#show' do
  let(:community) { create(:community) }
  let(:account) { create(:account) }
  let(:discussion) { create(:discussion, community: community) }
  let(:path) { api_v1_discussion_path(community, discussion) }
  let(:header) { token_header(account.token) }

  context 'if the account has no profile for the community' do
    specify 'it sends a forbidden error' do
      get(path, headers: header)
      expect_error 403
    end
  end

  context 'if the account has a profile for the community' do
    before do
      create(:profile, account: account, community: community)
    end

    context 'but no discussion matches' do
      specify 'it sends a not found error' do
        get(api_v1_discussion_path(community, 404101), headers: header)
        expect_error 404
      end
    end

    context 'and a discussion matches' do
      specify 'it sends the discussion with topic, started, active and posts' do
        get(path, headers: header)
        expect_response(200,
          id: Integer,
          topic: String,
          started: String,
          active: String,
          posts: [{
            id: Integer,
            body: String,
            posted: String
          }]
        )
      end
    end
  end
end
