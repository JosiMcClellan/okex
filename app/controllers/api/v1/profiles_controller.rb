class Api::V1::ProfilesController < ApplicationController

  before_action :requires_community, :requires_account

  def show
    Halt.found requires_profile
  end

  def create
    Halt.unprocessable unless params[:handle]
    Halt.saved @community.profiles.build(
      account: @account,
      handle: params[:handle]
    )
  end

end
