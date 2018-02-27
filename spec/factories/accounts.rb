FactoryBot.define do
  factory :account do
    uid { Faker::Number.number(9) }
    email { "#{Faker::Zelda.location}#{rand(10000..99999)}@turing.io" }
    email_verified { true }
    token { 'totes-secure' }
  end
end
