class Profile < ApplicationRecord

  before_validation :set_handle_and_slug

  belongs_to :account
  belongs_to :community
  has_many :discussions
  has_many :posts
  # has_many :profile_responses
  # has_many :match_responses
  # has_many :flags
  # has_one :suspension

  validates_presence_of :handle, :slug

  def set_handle_and_slug
    self.handle ||= "drone##{SecureRandom.hex}"
    self.slug = handle
  end

  # enum role: ['default', 'moderator']

end
