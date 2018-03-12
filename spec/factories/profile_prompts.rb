FactoryBot.define do
  factory :profile_prompt do
    community
    text { Faker::RuPaul.quote.chomp('!') + '?' }
  end
end
