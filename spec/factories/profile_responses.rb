FactoryBot.define do
  factory :profile_response do
    profile
    profile_prompt
    body do
      case rand(10)
      when 0..3 then Faker::Lorem.sentence
      when 4..7 then Faker::Lorem.sentences.join(' ');
      when 8..9 then Faker::Lorem.paragraph
      else Faker::Lorem.paragraphs.join("\n")
      end
    end
  end
end
