class ProfileSerializer < ApplicationSerializer
  attributes :handle

  belongs_to :community

  # has_many :match_responses
  # has_many :profile_responses
end
