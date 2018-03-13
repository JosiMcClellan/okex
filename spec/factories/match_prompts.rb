def dessert
  "#{Faker::Dessert.flavor} #{Faker::Dessert.variety} with #{Faker::Dessert.topping}"
end

dessert_comparison = ->{"#{dessert} or #{dessert}?"}
# e.g. Banana Sweet Bread with Frosting or Chocolate Cookie with Whipped Cream?

FactoryBot.define do
  factory :match_prompt do
    community
    text &dessert_comparison
  end
end
