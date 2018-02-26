class Api::V1::CommunitiesController < ApplicationController

  def index
    render json: Community.all
  end

  def show
    set_community && render(json: @community)
  end

end
