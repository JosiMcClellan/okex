class CommunitySerializer < ApplicationSerializer

  attributes(
    :id,
    :name,
    :slug,
    :description,
    :image,
    :founded,
    :active
  )

  def image
    object.image_url
  end

  def founded
    formatted_time(:created_at)
  end

  def active
    formatted_time(:updated_at)
  end

end
