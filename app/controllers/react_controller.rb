class ReactController < ApplicationController
  def index
    render 'public/index.html', layout: false, content_type: 'text/html'
  end
end
