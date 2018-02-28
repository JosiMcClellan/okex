class Discussion < ApplicationRecord

  belongs_to :profile, touch: true
  belongs_to :community#, through: :profile
  has_many :posts

  validates_presence_of :topic

end
