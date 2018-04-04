class Api::V1::DiscussionsController < ApplicationController

  before_action :requires_profile

  def index
    Halts.found @community.discussions.eager_load(:posts)
  end

  def show
    Halts.found @community.discussions.find_by_id(params[:id])
  end

  def create
    Halts.saved @community.discussions.build(
      profile: @profile,
      topic: params[:topic]
    )
  end

end
