class Api::V1::ProfileFieldsController < ApplicationController

  before_action :require_profile, :require_prompt

  def update
    response = find_response
    halt cant_save: response unless response.update(body: params[:body])
    send_updated_field
  end

  private

    def require_prompt
      halt :no_record unless @prompt =
        @community.profile_prompts.find_by_id(params[:id])

    def find_response
      @prompt.profile_responses.find_or_initialize_by(profile: @profile)
    end

    def send_updated_field
      render status: 201, json: {
        id: @prompt.id,
        prompt: @prompt.text,
        response: params[:body]
      )
    end

end
