class Community < ApplicationRecord

  to_param :slug
  before_create :set_slug

  # belongs_to :category
  has_many :profiles
  has_many :discussions
  # has_many :profile_prompts
  # has_many :match_prompts

  validates_presence_of :name, :description, :image_url

  def set_slug
    self.slug = name.parameterize
  end

end
