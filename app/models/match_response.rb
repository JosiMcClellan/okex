class MatchResponse < ApplicationRecord

  belongs_to :profile
  belongs_to :match_prompt

  validates_numericality_of :answer, :weight,
    greater_than_or_equal_to: 0,
    less_than_or_equal_to: 10,
    only_integer: true

end
