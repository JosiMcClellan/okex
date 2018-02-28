class Api::V1::ProfilesController < ApplicationController

  before_action :require_community, :require_account

  def show
    try_okay Profile.find_by(account: @account, community: @community)
  end

  def create
    try_created @community.profiles.create(account: @account)
  end

end
