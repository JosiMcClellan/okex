require_relative 'request_spec_helper'

describe 'questions#update' do
  let(:community) { create(:community) }
  let(:account) { create(:account) }
  let(:header) { token_header(account.token) }
  let(:path) { api_v1_questions_path(community) }

  context 'when the account has no profile for the community' do
    specify 'it fails, sending a forbidden error' do
      get(path, headers: header)
      expect_error 403
    end
  end

  context 'when the account has a profile for the community' do
    let!(:profile){ create(:profile, account: account, community: community) }
    let!(:prompts){ create_list(:match_prompt, 2, community: community) }

    context 'and questions have not been answered' do
      specify 'it succeeds, sending all questions, including id and prompt' do
        get(path, headers: header)
        expect_response(200, [{
          id: Integer,
          prompt: String
        }])
      end
    end

    context 'and questions have been answered excluding optional fields' do
      specify 'it succeeds, sending all questions, including
        id,
        prompt,
        answer,
        weight
      'do
        prompts.each do |prompt|
          create(:match_response,
            profile: profile,
            match_prompt: prompt,
            weight: 0,
            explanation: nil,
          )
        end
        get(path, headers: header)

        expect_response(200, [{
          id: Integer,
          prompt: String,
          answer: Integer,
          weight: 0,
        }])
      end
    end

    context 'and questions have been answered including fields' do
      specify 'it succeeds, sending all questions, including
        id,
        prompt,
        answer,
        weight,
        ideal,
        explanation
      'do
        prompts.each do |prompt|
          create(:match_response,
            profile: profile,
            match_prompt: prompt,
            weight: 1,
            ideal: 2,
            explanation: 'just for the halibut'
          )
        end
        get(path, headers: header)

        expect_response(200, [{
          id: Integer,
          prompt: String,
          answer: Integer,
          weight: 1,
          ideal: 2,
          explanation: 'just for the halibut'
        }])
      end
    end
  end

end
