class PostSerializer < ActiveModel::Serializer

  attributes :id, :body
  attribute :created_at, key: :postedAt

end
