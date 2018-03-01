class PostSerializer < ApplicationSerializer

  attributes :id, :body, :posted

  def posted
    formatted_time(:created_at)
  end

end
