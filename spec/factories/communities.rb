FactoryBot.define do
  factory :community do
    name { Faker::Hipster.unique.words(2).join(' ').titleize + ' Awareness' }
    slug { name.parameterize }
    description { Faker::Hipster.sentence }
    image_url do
      type = ['', 'c/', 'g/'].sample
      width = rand(250..350)
      height = width * rand(0.8..2.2)
      "https://www.placecage.com/#{type}#{width}/#{height}"
    end
  end
end
