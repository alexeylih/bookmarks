class MarkRemovedVideosJob
  @queue = :mark_videos

  def self.perform
  	YoutubeBookmark.where(removed: false).each do |bookmark|
  		p bookmark.title
  	end
  end


end