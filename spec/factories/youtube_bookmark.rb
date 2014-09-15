# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :youtube_bookmark do
    url "http://www.test.com"
    association :user, :factory => :user
  end

end
