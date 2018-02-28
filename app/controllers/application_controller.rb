class ApplicationController < ActionController::API
  include ResponseHelpers

  after_action :ensure_response
  def ensure_response
    general_error unless performed?
  end

  def require_community
    @community ||= Community.find_by_slug(params[:slug])
    @community || no_record
  end

  def require_account
    return unauthorized unless token = extract_auth('Token')
    @account ||= Account.find_by_token(token)
    @account || unauthorized
  end

  def require_profile
    return unless require_community && require_account
    @profile ||= Profile.find_by(account: @account, community: @community)
    @profile || forbidden
  end

  def extract_auth(type)
    AuthHeader.extract(type, request.headers[:Authorization])
  end

end
