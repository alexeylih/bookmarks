class Bookmark < ActiveRecord::Base
	
	belongs_to :user
	validates :user, presence: true
	
	validates :url, presence: true
	validate :validate_url

	def load_extra_info
	end

	def serializable_hash options=nil
  		super.merge "type" => type
	end

	private

	def validate_url
		errors.add(:url, "is invalid") unless url_valid?(url)
	end

	def url_valid?(url) 
		url = URI.parse(url) rescue false
		url.kind_of?(URI::HTTP) || url.kind_of?(URI::HTTPS)
	end

end	

