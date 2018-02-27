class Discussion < ApplicationRecord

  belongs_to :profile
  belongs_to :community
  has_many :posts

  validates_presence_of :topic

end
