class Api::V1::CommunitiesController < ApplicationController

  def index
    halt found: Community.all
  end

  def show
    halt found: require_community
  end

end
