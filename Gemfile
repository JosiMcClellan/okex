source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# off-omakase, might use
# gem 'capistrano-rails', group: :development
# gem 'redis', '~> 4.0'
# gem 'rack-cors'

gem 'rails', '~> 5.1.5'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.7'

gem "figaro", "~> 1.1"
gem "active_model_serializers", "~> 0.10.7"
gem "factory_bot_rails", "~> 4.8"
gem "database_cleaner", "~> 1.6"
gem "faker", "~> 1.8"

group :development, :production do
  gem "sendgrid-ruby", "~> 5.2"
  gem "faraday", "~> 0.14.0"
  gem "jwt", "~> 2.1"
end

group :development, :test do
  gem "foreman", "~> 0.64.0"
  gem "pry", "~> 0.11.3"
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
end

group :test do
  gem "rspec-rails", "~> 3.7"
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
