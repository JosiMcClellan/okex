class Community < ApplicationRecord

  before_validation :set_slug
  def to_param
    slug
  end

  # belongs_to :category
  has_many :profiles
  has_many :discussions#, through :profiles
  # has_many :profile_prompts
  # has_many :match_prompts

  validates_presence_of :name, :description, :image_url, :slug

  def set_slug
    self.slug ||= name.parameterize
  end

end
