class ProfilePrompt < ApplicationRecord

  belongs_to :community
  has_many :profile_responses
  validates_presence_of :text

end
