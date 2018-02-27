class Api::V1::DiscussionsController < ApplicationController

  before_action :set_profile

  def index
    render json: @community.discussions
  end

  def show
    @discussion = @community.discussions.find_by_id(params[:id])
    render json: @discussion.includes(:posts)
  end

end
