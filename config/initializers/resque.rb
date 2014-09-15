require 'resque_scheduler'
Resque.schedule = YAML.load_file(File.join(Rails.root, 'config/resque_scheduler.yml'))