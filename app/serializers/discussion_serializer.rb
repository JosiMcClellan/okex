class DiscussionSerializer < ApplicationSerializer

  has_many :posts
  attributes :id, :topic, :started, :active

  def started
    formatted_time(:created_at)
  end

  def active
    formatted_time(:updated_at)
  end

end
