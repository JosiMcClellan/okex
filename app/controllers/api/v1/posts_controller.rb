class Api::V1::PostsController < ApplicationController

  before_action :require_profile, :require_discussion

  def create
    try_created @discussion.posts.create(
      profile: @profile,
      body: params[:body]
    )
  end

  private

    def require_discussion
      no_resource unless @discussion = find_discussion
    end

    def find_discussion
      @community.discussions.find_by_id(params[:discussion_id])
    end

end
