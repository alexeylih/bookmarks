class BookmarkFactory 

	YOUTUBE_REGEX = 
	/^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w-]{10,})/

	def BookmarkFactory.create(url)
		if matches_youtube_regex?(url) 
			bookmark = YoutubeBookmark.new(url: url)
		else
			bookmark = Bookmark.new(url: url)
		end 
		bookmark
	end 

	private 

	def BookmarkFactory.matches_youtube_regex?(url)
		(url =~ YOUTUBE_REGEX) == 0
	end 

end