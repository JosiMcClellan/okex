class Api::V1::PostsController < ApplicationController

  before_action :requires_profile, :requires_discussion

  def create
    Halts.saved @discussion.posts.build(
      profile: @profile,
      body: params[:body]
    )
  end

  private

    def requires_discussion
      @discussion = @community.discussions.find_by_id(params[:discussion_id])
      @discussion || Halts.no_record
    end

end
