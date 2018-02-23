class ApplicationController < ActionController::API
  def not_found
    render 404, json: { error: 'bad url' }
  end
end
