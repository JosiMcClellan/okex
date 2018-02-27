FactoryBot.define do
  factory :discussion do
    community
    profile
    topic { Faker::Company.catch_phrase }
  end
end
