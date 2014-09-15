source 'https://rubygems.org'
source 'https://rails-assets.org'
ruby '2.1.0'

gem 'rails', '4.0.1'
gem 'thin'
gem 'pg'

group :production do
  gem 'rails_12factor'
end

group :assets do
  gem 'uglifier', '>= 1.3.0'
end

gem 'jquery-rails'
gem 'twitter-bootstrap-rails'
gem 'nokogiri'
gem 'devise', '~> 3.2'
gem 'json'
gem 'resque', :require => 'resque/server'
gem 'resque-scheduler', '~> 2.5.5'
gem 'sucker_punch'
gem 'youtube_it'

group :development, :test do
  gem 'rspec-rails', '~> 3.0.0'
  gem 'factory_girl_rails', '4.2.1'
  gem 'rspec_api_documentation'
  gem 'better_errors'
  gem 'binding_of_caller'
end

group :test do
  gem 'faker'
  gem 'rack-test'
  gem 'turn', :require => false
  gem 'database_cleaner'
  gem 'shoulda-matchers'
  gem 'shoulda-callback-matchers', '>=0.3.0'
  gem 'json_spec'
end
