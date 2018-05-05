class Api::V1::PostsController < ApplicationController

  before_action :requires_profile, :requires_discussion

  def create
    Halt.saved @discussion.posts.build(
      profile: @profile,
      body: params[:body]
    )
  end

  private

    def requires_discussion
      @discussion = @community.discussions.find_by_id(params[:discussion_id])
      @discussion || Halt.not_found
    end

end
