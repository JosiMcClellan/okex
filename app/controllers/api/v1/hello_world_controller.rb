class Api::V1::HelloWorldController < ApplicationController

  def hello_world
    world = World.find_or_create_by( hello: 'World' )
    render status: 418, json: world
  end

end
