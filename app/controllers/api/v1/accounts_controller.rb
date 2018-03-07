class Api::V1::AccountsController < ApplicationController

  def create
    return unauthorized unless code = extract_auth('Bearer')
    return unless tokens = fetch_tokens(code)
    try_created create_account(tokens)
  end

  private

    def fetch_tokens(code)
      tokens = GoogleOauth.fetch_tokens(code)
      return tokens unless tokens['error']
      general_error(error_message(tokens))
    end

    def error_message(tokens)
       "Google OAuth error: #{tokens['error_description']}"
    end

    def create_account(tokens)
      AccountCreator.create(tokens)
    end

end
