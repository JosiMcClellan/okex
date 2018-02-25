class Api::V1::CommunitiesController < ApplicationController

  def index
    render json: Community.all
  end

  # def show
  #   render json: Community.find(params[:id])
  # end

  def preview
    render json: Community.find_by_id(params[:id]) || no_record
  end

end
