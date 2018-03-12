source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development
# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

gem 'rails', '~> 5.1.5'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.7'

gem "active_model_serializers", "~> 0.10.7"
gem "factory_bot_rails", "~> 4.8"
gem "faker", "~> 1.8"

group :development, :production do
  gem "sendgrid-ruby", "~> 5.2"
  gem "faraday", "~> 0.14.0"
  gem "jwt", "~> 2.1"
end

group :development, :test do
  # gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem "foreman", "~> 0.64.0"
  gem "pry", "~> 0.11.3"
  gem "database_cleaner", "~> 1.6"
end

group :development do
  gem "figaro", "~> 1.1"
  gem 'listen', '>= 3.0.5', '< 3.2'
end

group :test do
  gem "rspec-rails", "~> 3.7"
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
