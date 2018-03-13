class ApplicationController < ActionController::API
  include ResponseHelpers

  after_action { general_error unless performed? }
  rescue_from PG::Error, with: :unprocessable

  def require_community
    @community ||= Community.find_by_slug(params[:slug])
    @community || no_record
  end

  def require_account
    @account ||= Account.find_by_token(extract_auth('Token'))
    @account || unauthorized
  end

  def require_profile
    return unless require_community && require_account
    @profile ||= Profile.find_by(community: @community, account: @account)
    @profile || forbidden
  end

  def extract_auth(type)
    pattern = /#{type} (.+)/
    match = pattern.match(request.headers[:Authorization])
    match && match.captures.first
  end

end
