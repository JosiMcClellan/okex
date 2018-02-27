class ApplicationController < ActionController::API

  def set_community
    @community ||= Community.find_by_slug(params[:slug])
    @community || no_record
  end

  def set_account
    return bad_auth unless token = extract_auth('Token')
    @account ||= Account.find_by_token(token)
    @account || unauthorized
  end

  def set_profile
    return unless set_community && set_account
    @profile ||= Profile.find_by(account: @account, community: @community)
    @profile || unauthorized
  end

  def extract_auth(type)
    AuthHeader.extract(type, request.headers[:Authorization])
  end

  def send_error(status, message)
    render status: status, json: { error: message }
    false
  end

  def bad_request
    send_error 404, 'bad request'
  end

  def no_record
    send_error 404, 'record not found'
  end

  def unauthorized
    send_error 403, 'unauthorized'
  end

  def bad_auth
    send_error 500, 'bad authorization header'
  end

end
