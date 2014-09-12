class Bookmark < ActiveRecord::Base
	validates :url, presence: true

	belongs_to :user
	validates :user, presence: true
end
