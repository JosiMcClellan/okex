class Api::V1::QuestionsController < ApplicationController

  before_action :require_profile

  def index
    halt found: PromptResponseZipper.zip_match_questions(@profile)
  end

  def update
    response = find_response
    halt cant_save: response unless response.update(response_params)
    send_updated_question(response)
  end

  private

    def response_params
      params.permit(:answer, :weight, :ideal, :explanation)
    end

    def find_response
      require_prompt
      @prompt.match_responses.find_or_initialize_by(profile: @profile)
    end

    def require_prompt
      halt :no_record unless @prompt =
        @community.match_prompts.find_by_id(params[:id])
    end

    def send_updated_question(response)
      render status: 201, json: {
        id: @prompt.id,
        prompt: @prompt.text,
        answer: response.answer,
        weight: response.weight,
        ideal: response.ideal,
        explanation: response.explanation
      }
    end

end
