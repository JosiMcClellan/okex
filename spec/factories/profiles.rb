FactoryBot.define do
  factory :profile do
    community
    account
    handle {
      [
        community.slug,
        Faker::Internet.user_name,
        account.google_sub
      ].join('.').gsub(/[^a-z0-9]/, '.')
    }
  end
end
