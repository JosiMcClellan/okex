class Api::V1::ProfilesController < ApplicationController

  before_action :require_community, :require_account

  def show
    halt found: require_profile
  end

  def create
    halt saved: @community.profiles.build(
      account: @account,
      handle: params[:handle]
    )
  end

end
