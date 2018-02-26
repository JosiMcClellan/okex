class Api::V1::AccountsController < ApplicationController

  def create
    return unless @code = extract_auth('Bearer')
    render json: AccountCreator.new(request_tokens).create
  end

  private

    def token_url
      'https://www.googleapis.com/oauth2/v4/token'
    end

    def request_tokens
      Faraday.post(token_url) do |req|
        req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        req.body = build_body
      end
    end

    def build_body
      {
        code: @code,
        client_id: ENV['GOOGLE_CLIENT_ID'],
        client_secret: ENV['GOOGLE_CLIENT_SECRET'],
        redirect_uri: 'http://localhost:3000',
        grant_type: 'authorization_code'
      }
    end
end
