class Api::V1::CommunitiesController < ApplicationController

  def index
    Halt.found Community.all
  end

  def show
    Halt.found requires_community
  end

end
