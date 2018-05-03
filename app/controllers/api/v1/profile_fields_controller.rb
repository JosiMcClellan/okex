class Api::V1::ProfileFieldsController < ApplicationController

  before_action :requires_prompt

  def update
    response = find_response
    Halt.invalid(response) unless response.update(body: params[:body])
    send_updated_field
  end

  private

    def requires_prompt
      requires_profile
      @prompt = @community.profile_prompts.find_by_id(params[:id])
      @prompt || halt(:no_record)
    end

    def find_response
      @prompt.profile_responses.find_or_initialize_by(profile: @profile)
    end

    def send_updated_field
      Halt.throw 201, {
        id: @prompt.id,
        prompt: @prompt.text,
        response: params[:body]
      }
    end

end
