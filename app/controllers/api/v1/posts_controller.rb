class Api::V1::PostsController < ApplicationController

  before_action :require_profile, :require_discussion

  def create
    halt saved: @discussion.posts.build(
      profile: @profile,
      body: params[:body]
    )
  end

  private

    def require_discussion
      halt :no_record unless @discussion =
        @community.discussions.find_by_id(params[:discussion_id])
    end

end
