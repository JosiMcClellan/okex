class PostSerializer < ActiveModel::Serializer

  attributes  :id, :body

  def postedAt
    object.created_at
  end

end
