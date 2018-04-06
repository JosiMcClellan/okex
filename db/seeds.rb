require_relative 'seeder'
require_relative 'test_seeder'
DatabaseCleaner.clean_with :truncation

# This seems dangerous... let's change it soon?
puts Rails.env
if Rails.env.test?
  TestSeeder.new.seed else Seeder.new.seed
end
