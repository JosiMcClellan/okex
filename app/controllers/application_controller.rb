class ApplicationController < ActionController::API

  def bad_url
    render 404, json: { error: 'bad url' }
  end

  def no_record
    render 404, json: { error: 'no record found' }
  end
end
