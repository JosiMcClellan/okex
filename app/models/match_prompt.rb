class MatchPrompt < ApplicationRecord

  belongs_to :community
  has_many :match_responses
  validates_presence_of :text

end
