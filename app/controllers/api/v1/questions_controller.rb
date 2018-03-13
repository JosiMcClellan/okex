class Api::V1::QuestionsController < ApplicationController

  before_action :require_profile, :require_prompt

  def update
    response = find_response
    if response.update(response_params)
      response.save
      send_updated_question(response)
    else
      failed_to_save response
    end
  end

  private

    def response_params
      params.permit(:answer, :weight, :ideal, :explanation)
    end

    def require_prompt
      no_record unless @prompt = find_prompt
    end

    def find_prompt
      @community.match_prompts.find_by_id(params[:id])
    end

    def find_response
      @prompt.match_responses.find_or_initialize_by(profile: @profile)
    end

    # it'll be weird, but we can do this AM::S
    def send_updated_question(response)
      created({
        id: @prompt.id,
        prompt: @prompt.text,
        answer: response.answer,
        weight: response.weight,
        ideal: response.ideal,
        explanation: response.explanation
      })
    end

end
