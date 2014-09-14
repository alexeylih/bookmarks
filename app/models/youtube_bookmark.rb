class YoutubeBookmark < Bookmark
	def load_extra_info
		YoutubeDataLoader.new.async.perform(id)
	end
end
