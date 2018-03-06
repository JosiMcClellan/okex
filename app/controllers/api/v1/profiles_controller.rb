class Api::V1::ProfilesController < ApplicationController

  before_action :require_community, :require_account

  def show
    require_profile && okay(@profile)
  end

  def create
    try_created @community.profiles.create(account: @account)
  end

end
