class ApplicationController < ActionController::API
  rescue_from(PG::Error) { |error| json(422, error.message) }
  around_action handle_response

  def handle_response
    respond *Halt.catch(&block)
  end

  def json(status, jsonable)
    jsonable = { error: jsonable } if status >= 400
    render status: status, json: jsonable
  end

  def requires_community
    @community ||= Community.find_by_slug(params[:slug])
    @community || Halt.no_record
  end

  def requires_account
    @account ||= Account.find_by_token(extract_auth('Token'))
    @account || Halt.unauthorized
  end

  def requires_profile
    requires_community
    requires_account
    @profile ||= Profile.find_by(community: @community, account: @account)
    @profile || Halt.forbidden
  end

  def extract_auth(type)
    pattern = /#{type} (.+)/
    match = pattern.match(request.headers[:Authorization])
    match && match.captures.first
  end

end
