class MarkRemovedVideosJob
  @queue = :mark_videos

  def self.perform
  	YoutubeBookmark.where(removed: false).each do |bookmark|
		begin
			sleep 2
			YouTubeIt::Client.new.video_by(bookmark.url)
		rescue Exception => e
		  	if e.to_s == "403" #Forbidden 
		  		bookmark.update_attributes(thumbnail_url: "", title: "Removed video", removed: true)
		  	else
		  		Rails.logger.error "Failed to process youtube info for #{bookmark_id}, #{e}"
		  	end 
		end
  	end
  end


end