class DiscussionSerializer < ActiveModel::Serializer

  attributes :id, :topic

  def activeAt
    object.updated_at
  end

  def createdAt
    object.created_at
  end

  has_many :posts

end
