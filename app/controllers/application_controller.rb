class ApplicationController < ActionController::API

  def set_account
    return unless token = extract_auth('Token')
    @account ||= Account.find_by_token(token)
    unauthorized unless @account
  end

  def set_community
    @community ||= Community.find_by_slug(params[:c_slug])
    no_record unless @community
  end

  def set_profile
    return unless set_account && set_community
    @profile ||= Profile.find_by(account: @account, community: @community)
    unauthorized unless @profile
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

  def send_error(status, message)
    render status, json: { error: message }
    false
  end

  def extract_auth(type)
    auth = AuthHeader.extract(type, request.headers[:Authorization])
    auth || bad_auth
  end

end
