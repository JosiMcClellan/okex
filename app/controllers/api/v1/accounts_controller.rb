class Api::V1::AccountsController < ApplicationController

  def create
    halt :unauthorized unless code = extract_auth('Bearer')
    tokens = fetch_tokens(code)
    halt saved: AccountCreator.create(tokens)
  end

  private

    def fetch_tokens(code)
      tokens = GoogleOauth.fetch_tokens(code)
      return tokens unless tokens['error']
      halt generic: "Google OAuth error:
        #{tokens['error']}:
        #{tokens['error_description']}
      "
    end

end
