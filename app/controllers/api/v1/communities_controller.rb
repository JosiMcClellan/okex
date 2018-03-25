class Api::V1::CommunitiesController < ApplicationController

  def index
    Halts.found Community.all
  end

  def show
    Halts.found requires_community
  end

end
