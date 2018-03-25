class Api::V1::DiscussionsController < ApplicationController

  before_action :require_profile

  def index
    halt found: @community.discussions.eager_load(:posts)
  end

  def show
    halt found: @community.discussions.find_by_id(params[:id])
  end

  def create
    halt saved: @community.discussions.build(
      profile: @profile,
      topic: params[:topic]
    )
  end

end
