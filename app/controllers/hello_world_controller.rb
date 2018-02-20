class HelloWorldController < ApplicationController

  def hello_world
    world = World.find_or_create_by( hello: 'World' )
    render json: world
  end

end
