require_relative 'request_spec_helper'

describe 'questions#update' do
  let(:community) { create(:community) }
  let(:account) { create(:account) }
  let(:header) { token_header(account.token) }
  let(:match_prompt) { create(:match_prompt, community: community) }
  let(:path) { api_v1_question_path(community, match_prompt) }

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

    context 'and the params include answer, weight, and ideal' do
      let(:params) do
        {
          answer: 1,
          weight: 2,
          ideal: 3,
        }
      end

      context 'and there was previous response for that prompt' do
        specify 'it succeeds, creating and sending the field' do
          put(path, headers: header, params: params)
          expect_response 201, {
            id: match_prompt.id,
            prompt: match_prompt.text,
            **params
          }
        end
      end

      context 'and there was previous response for that prompt' do
        specify 'it succeeds, updating and sending the field' do
          old = create(:match_response, profile: profile, match_prompt: match_prompt)
          put(path, headers: header, params: params)
          expect_response 201, {
            id: match_prompt.id,
            prompt: match_prompt.text,
            **params
          }
        end
      end

      context 'and the optional explanation is also supplied' do
        specify 'it succeeds, updating and sending the field' do
          old = create(:match_response, profile: profile, match_prompt: match_prompt)
          put(path, headers: header, params: { **params, explanation: 'optional' })
          expect_response 201, {
            id: match_prompt.id,
            prompt: match_prompt.text,
            explanation: 'optional',
            **params
          }
        end
      end

    end

  end

end
