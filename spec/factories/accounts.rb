FactoryBot.define do
  factory :account do
    google_sub { Faker::Number.unique.number(9) }
    token { SecureRandom.uuid }
    email { "#{Faker::Zelda.location}#{google_sub}@turing.io" }
    email_verified { [true, false].sample }
  end
end
