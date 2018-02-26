class Profile < ApplicationRecord

  before_create :set_handle

  belongs_to :account
  belongs_to :community
  # has_many :profile_responses
  # has_many :match_responses
  # has_many :flags
  # has_one :suspension

  validates_presence_of :handle

  def set_handle
    self.handle ||= "drone##{SecureRandom.hex}"
  end

  # enum role: ['default', 'moderator']

end
