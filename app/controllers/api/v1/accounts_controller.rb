class Api::V1::AccountsController < ApplicationController

  def create
    Halts.unauthorized unless code = extract_auth('Bearer')
    tokens = fetch_tokens(code)
    Halts.saved AccountCreator.create(tokens)
  end

  private

    def fetch_tokens(code)
      tokens = GoogleOauth.fetch_tokens(code)
      return tokens unless tokens['error']
      Halts.generic "Google OAuth error:
        #{tokens['error']}:
        #{tokens['error_description']}
      "
    end

end
