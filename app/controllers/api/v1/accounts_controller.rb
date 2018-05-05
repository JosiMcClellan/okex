class Api::V1::AccountsController < ApplicationController

  def create
    Halt.unauthorized unless code = extract_auth('Bearer')
    tokens = fetch_tokens(code)
    Halt.saved AccountCreator.create(tokens)
  end

  private

    def fetch_tokens(code)
      tokens = GoogleOauth.fetch_tokens(code)
      return tokens unless tokens['error']
      Halt.generic_error "Google OAuth error:
        #{tokens['error']}:
        #{tokens['error_description']}
      "
    end

end
