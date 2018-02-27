class Api::V1::ProfilesController < ApplicationController
  before_action :set_account, :set_community

  def show
    render json: Profile.find_by(
      account: @account,
      community: @community
    )
  end

  def create
    profile = @community.profiles.new(account: @account)
    if profile.save
      render json: profile
    else
      send_error 500, profile.errors.full_messages
    end
  end

end
