class Discussion < ApplicationRecord

  default_scope{ order(updated_at: :desc) }

  belongs_to :profile, touch: true
  belongs_to :community#, through: :profile, right?  No time.
  has_many :posts

  validates_presence_of :topic

end
