class ApplicationController < ActionController::API
  around_action :render_halt

  def render_halt(&block)
    status, jsonable = Halt.catch(&block)
    return if performed?
    jsonable = { error: jsonable } if status >= 400
    render status: status, json: jsonable
  end

  def requires_community
    @community ||= Community.find_by_slug(params[:slug])
    @community || Halt.not_found
  end

  def requires_account
    @account ||= Account.find_by_token(extract_auth('Token'))
    @account || Halt.unauthorized
  end

  def requires_profile
    parents = { community: requires_community, account: requires_account }
    @profile ||= Profile.find_by(parents)
    @profile || Halt.forbidden
  end

  def extract_auth(type)
    pattern = /#{type} (.+)/
    match = pattern.match(request.headers[:Authorization])
    match && match.captures.first
  end

end
