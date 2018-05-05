class Profile < ApplicationRecord

  before_validation :set_slug

  belongs_to :account, touch: true
  belongs_to :community, touch: true
  has_many :discussions
  has_many :posts
  has_many :profile_responses
  has_many :match_responses

  validates_presence_of :handle, :slug
  enum role: ['default', 'moderator']

  def set_slug
    self.slug ||= handle.parameterize
  end

end
