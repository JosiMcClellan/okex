class Post < ApplicationRecord

  belongs_to :profile, touch: true
  belongs_to :discussion, touch: true

  validates_presence_of :body

end
