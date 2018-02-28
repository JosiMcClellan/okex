class Api::V1::DiscussionsController < ApplicationController

  before_action :require_profile

  def index
    okay @community.discussions
  end

  def show
    try_okay @community.discussions.find_by_id(params[:id])
  end

end
