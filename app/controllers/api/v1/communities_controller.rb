class Api::V1::CommunitiesController < ApplicationController

  def index
    render json: Community.all
  end

  def show
    render(json: @community) if set_community
  end

end
