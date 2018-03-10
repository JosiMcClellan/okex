require_relative 'request_spec_helper'

describe 'posts#create' do
  let(:community) { create(:community) }
  let(:account) { create(:account) }
  let(:discussion) { create(:discussion, community: community) }
  let(:path) { api_v1_discussion_posts_path(community, discussion) }
  let(:header) { token_header(account.token) }

  context 'when the account has no profile for the community' do
    specify 'it sends a forbidden error' do
      post(path, headers: header)
      expect_error 403
    end
  end

  context 'when the account has a profile for the community' do
    before do
      create(:profile, account: account, community: community)
    end

    context 'but no body param is supplied' do
      specify 'it sends an unprocessable error' do
        post(path, headers: header)
        expect_error 422
      end
    end

    context 'and a body param is supplied' do
      specify 'it it creates and sends a post with id, body, and posted' do
        post(path, headers: header, params: { body: 'positive' })
        expect_response(201,
          id: Integer,
          body: String,
          posted: String
        )
      end
    end
  end
end
