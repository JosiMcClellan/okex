class Api::V1::CommunitiesController < ApplicationController

  def index
    okay Community.all
  end

  def show
    okay @community if require_community
  end

end
