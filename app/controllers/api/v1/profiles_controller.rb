class Api::V1::ProfilesController < ApplicationController

  before_action :requires_community, :requires_account

  def show
    Halts.found requires_profile
  end

  def create
    Halts.saved @community.profiles.build(
      account: @account,
      handle: params[:handle]
    )
  end

end
