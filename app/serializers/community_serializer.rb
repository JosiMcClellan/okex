class CommunitySerializer < ActiveModel::Serializer

  attributes  :id,
              :name,
              :slug,
              :description,
              :image_url,
              :created_at,
              :updated_at

  # has_many :profile_prompts
  # has_many :match_prompts
end
