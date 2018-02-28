class DiscussionSerializer < ActiveModel::Serializer

  has_many :posts
  attributes :id, :topic
  attribute :updated_at, key: :activeAt
  attribute :created_at, key: :createdAt

end
