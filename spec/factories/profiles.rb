FactoryBot.define do
  factory :profile do
    community
    account
    handle { Faker::Internet.user_name + Faker::Business.credit_card_number }
  end
end
