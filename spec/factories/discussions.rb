FactoryBot.define do
  factory :discussion do
    community
    profile { create(:profile, community: community) }
    topic { Faker::Company.catch_phrase }
  end
end
