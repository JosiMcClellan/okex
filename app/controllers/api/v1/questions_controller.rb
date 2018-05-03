class Api::V1::QuestionsController < ApplicationController

  before_action :requires_profile

  def index
    Halt.found PromptResponseZipper.zip_match_questions(@profile)
  end

  def update
    response = find_response
    Halt.invalid(response) unless response.update(response_params)
    send_updated_question(response)
  end

  private

    def response_params
      params.permit(:answer, :weight, :ideal, :explanation)
    end

    def find_response
      requires_prompt
      @prompt.match_responses.find_or_initialize_by(profile: @profile)
    end

    def requires_prompt
      @prompt = @community.match_prompts.find_by_id(params[:id])
      @prompt || Halt.not_found
    end

    def send_updated_question(response)
      Halt.throw 201, {
        id: @prompt.id,
        prompt: @prompt.text,
        answer: response.answer,
        weight: response.weight,
        ideal: response.ideal,
        explanation: response.explanation
      }
    end

end
