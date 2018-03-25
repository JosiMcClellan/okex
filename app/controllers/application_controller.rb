class ApplicationController < ActionController::API

  def halt(type)
    raise ::Halt.send(type) unless type.is_a? Hash
    name, data = type.first
    raise ::Halt.send(name, data)
  end

  rescue_from(::Halt) do |e|
    render(status: e.status, json: e.data)
  end
  rescue_from(PG::Error) do |e|
    halt(:unprocessable, error.message)
  end
  after_action do
    halt generic: 'server did nothing' unless performed?
  end

  def require_community
    @community ||= Community.find_by_slug(params[:slug])
    @community || halt(:no_record)
  end

  def require_account
    @account ||= Account.find_by_token(extract_auth('Token'))
    @account || halt(:unauthorized)
  end

  def require_profile
    require_community
    require_account
    @profile ||= Profile.find_by(community: @community, account: @account)
    @profile || halt(:forbidden)
  end

  def extract_auth(type)
    pattern = /#{type} (.+)/
    match = pattern.match(request.headers[:Authorization])
    match && match.captures.first
  end

end
