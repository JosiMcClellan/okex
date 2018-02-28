FactoryBot.define do
  factory :account do
    uid { Faker::Number.number(9) }
    email { "#{Faker::Zelda.location}#{uid}@turing.io" }
    email_verified { true }
    token { Faker::Crypto.md5 }
  end
end
