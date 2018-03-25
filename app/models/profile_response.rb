class ProfileResponse < ApplicationRecord

  belongs_to :profile
  belongs_to :profile_prompt

  validates_presence_of :body

end
