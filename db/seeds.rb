require_relative 'seeder'
require_relative 'test_seeder'
DatabaseCleaner.clean_with :truncation

if Rails.env.test?
  TestSeeder.new.seed else Seeder.new.seed
end
