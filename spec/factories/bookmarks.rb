# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :bookmark do
    url "http://www.test.com"
    association :user, :factory => :user
  end

  factory :bookmark_without_user, class: Bookmark do
    url "http://www.test.com"
  end

end
