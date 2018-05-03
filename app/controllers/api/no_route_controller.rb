class Api::NoRouteController < ApplicationController
  def show
    Halt.no_route
  end
end
