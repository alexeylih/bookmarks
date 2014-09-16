require 'resque_scheduler'

ENV["REDISTOGO_URL"] ||= "redis://redistogo:d5f4522278848837dedb0a97c1ba65da@barreleye.redistogo.com:11855/"

uri = URI.parse(ENV["REDISTOGO_URL"])
Resque.redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password, :thread_safe => true)

Resque.schedule = YAML.load_file(File.join(Rails.root, 'config/resque_scheduler.yml'))