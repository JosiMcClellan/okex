require_relative 'request_spec_helper'

describe 'discussions#create' do
  let(:community) { create(:community) }
  let(:account) { create(:account) }
  let(:path) { api_v1_discussions_path(community) }
  let(:header) { token_header(account.token) }

  context 'if the account has no profile for the community' do
    specify 'it sends a forbidden error' do
      post(path, headers: header)
      expect_error 403
    end
  end

  context 'if the account has a profile for the community' do
    before do
      create(:profile, account: account, community: community)
    end

    context 'but no topic param is supplied' do
      specify 'it sends an unprocessable error' do
        post(path, headers: header)
        expect_error 422
      end
    end

    context 'and a topic param is supplied' do
      specify 'it creates and sends discussion with topic, started, active, posts' do
        post(path, headers: header, params: { topic: 'FOOBAR' })
        expect_response(201,
          id: Integer,
          topic: String,
          started: String,
          active: String,
          posts: [{
            id: Integer,
            body: String,
            posted: String,
          }]
        )
      end
    end
  end
end
