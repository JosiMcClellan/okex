require_relative 'seeder'
DatabaseCleaner.clean_with :truncation
Seeder.new.seed
