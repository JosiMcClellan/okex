class ApplicationController < ActionController::API
  include Halts

  around_action :handle_halts
  rescue_from(PG::Error) { |e| json(422, e.message) }

  def no_route
    Halts.throw 404, 'no route matches, check your URL'
  end

  def handle_halts
    args = catch(Halts::TAG) do
      yield
      Halts.generic('server did nothing') unless performed?
    end
    json(*args) if args
  end

  def json(status, jsonable = {})
    jsonable = { error: jsonable } if status >= 400
    output = { status: status, json: jsonable }
    render output
  end

  def requires_community
    @community ||= Community.find_by_slug(params[:slug])
    @community || Halts.no_record
  end

  def requires_account
    @account ||= Account.find_by_token(extract_auth('Token'))
    @account || Halts.unauthorized
  end

  def requires_profile
    requires_community
    requires_account
    @profile ||= Profile.find_by(community: @community, account: @account)
    @profile || Halts.forbidden
  end

  def extract_auth(type)
    pattern = /#{type} (.+)/
    match = pattern.match(request.headers[:Authorization])
    match && match.captures.first
  end

end
