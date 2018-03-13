class Api::V1::ProfileFieldsController < ApplicationController

  before_action :require_profile, :require_prompt

  def update
    response = find_response

    if response.update(body: params[:body])
      send_updated_field
    else
      failed_to_save response
    end
  end

  private

    def require_prompt
      no_record unless @prompt = find_prompt
    end

    def find_prompt
      @community.profile_prompts.find_by_id(params[:id])
    end

    def find_response
      @prompt.profile_responses.find_or_initialize_by(profile: @profile)
    end

    def send_updated_field
      created({
        id: @prompt.id,
        prompt: @prompt.text,
        response: params[:body]
      })
    end

end
