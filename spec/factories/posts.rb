FactoryBot.define do
  factory :post do
    discussion
    profile
    body { Faker::Lovecraft.paragraph }
  end
end
