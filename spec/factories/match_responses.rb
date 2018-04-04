FactoryBot.define do
  factory :match_response do
    profile
    match_prompt

    answer { rand(0..10) }
    weight { rand(0..10) }
    ideal { rand(0..10) unless weight.zero? }

    explanation do
      case rand(11)
      when 0..4 then nil
      when 5..6 then Faker::Lorem.sentence
      when 7..8 then Faker::Lorem.sentences.join(' ')
      when 9    then Faker::Lorem.paragraph
      else           Faker::Lorem.paragraphs.join("\n")
      end
    end
  end
end
