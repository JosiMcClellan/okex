require_relative 'request_spec_helper'

describe 'profile_fields#update' do
  let(:community) { create(:community) }
  let(:account) { create(:account) }
  let(:header) { token_header(account.token) }
  let(:path) { api_v1_profile_field_path(community, profile_prompt) }
  let(:profile_prompt) { create(:profile_prompt, community: community) }

  context 'when the account has no profile for the community' do
    specify 'it sends a forbidden error' do
      put(path, headers: header)
      expect_error 403
    end
  end

  context 'when the account has a profile for the community' do

    let!(:profile){ create(:profile, account: account, community: community) }

    context 'but no response param is supplied' do
      specify 'it sends an unprocessable error' do
        put(path, headers: header)
        expect_error 422
      end
    end

    context 'and a body param is supplied' do
      let(:params){ { body: 'positive' } }

      context 'and there was previous response for that prompt' do
        specify 'it succeeds, creating and sending the field' do
          put(path, headers: header, params: params)
          expect_response 201, {
            id: profile_prompt.id,
            prompt: profile_prompt.text,
            response: params[:body],
          }
        end
      end

      context 'and there was previous response for that prompt' do
        specify 'it succeeds, updating and sending the field' do
          old = create(:profile_response, profile: profile, profile_prompt: profile_prompt)
          put(path, headers: header, params: params)
          expect_response 201, {
            id: profile_prompt.id,
            prompt: profile_prompt.text,
            response: params[:body],
          }
        end
      end

    end

  end

end
