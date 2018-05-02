class NoRouteController < ApplicationController
  def show
    Halt.no_route
  end
end
