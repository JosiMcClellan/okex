class Api::V1::DiscussionsController < ApplicationController

  before_action :require_profile

  def index
    okay @community.discussions.eager_load(:posts)
  end

  def show
    try_okay @community.discussions.find_by_id(params[:id])
  end

  def create
    try_created @community.discussions.create(
      profile: @profile,
      topic: params[:topic]
    )
  end

end
