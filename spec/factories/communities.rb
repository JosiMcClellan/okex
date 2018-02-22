FactoryBot.define do
  factory :community do
    name { Faker::Hipster.unique.words(2).join(' ').titleize + ' Awareness' }
  end
end
