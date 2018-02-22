class Api::V1::CommunitiesController < ApplicationController

  def index
    render json: Community.all
  end

end
