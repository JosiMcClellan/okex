class Api::V1::AccountsController < ApplicationController

  def create
    return unauthorized unless code = extract_auth('Bearer')
    return general_error unless response = fetch_tokens(code)
    try_created create_account(response)
  end

  def fetch_tokens(code)
    GoogleOauth.fetch_tokens(code)
  end

  def create_account(response)
    AccountCreator.create(response)
  end

end
