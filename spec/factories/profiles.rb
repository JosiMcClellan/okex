FactoryBot.define do
  factory :profile do
    community
    account
    handle { Faker::Internet.user_name + Faker::Business.credit_card_number + Faker::Zelda.location }
  end
end
