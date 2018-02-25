class Api::V1::AccountsController < ApplicationController

  def create
    Faraday.post('')
  end

  private

    def extract_code
      auth = request.headers[:Authorization]
      /^Bearer (.+)$/.match(auth)captures.first
    end

end
