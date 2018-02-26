class Api::V1::ProfilesController < ApplicationController
  before_action :set_account, :set_community

  def show
    render json: Profile.find_by(
      account: @account,
      community: @community,
    )
  end

  def create
    render json: @community.profiles.create(account: @account)
  end

end
