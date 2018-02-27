class Post < ApplicationRecord

  belongs_to :profile
  belongs_to :discussion

  validates_presence_of :body

end
