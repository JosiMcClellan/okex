class ApplicationController < ActionController::API

  def set_account
    return bad_auth unless token = extract_auth('Token')
    @account ||= Account.find_by_token(token)
    unauthorized unless @account
  end

  def set_community
    @community ||= Community.find_by_slug(params[:slug])
    no_record unless @community
  end

  def set_profile
    set_account; set_community
    return unless @account && @community
    @profile ||= Profile.find_by(account: @account, community: @community)
    puts(puts(puts(puts(@profile))))
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
  end

  def extract_auth(type)
    AuthHeader.extract(type, request.headers[:Authorization])
  end

end
