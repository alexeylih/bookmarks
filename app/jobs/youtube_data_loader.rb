
class YoutubeDataLoader
 include SuckerPunch::Job

  def perform(bookmark_id)
  	begin
	    ActiveRecord::Base.connection_pool.with_connection do
	      bookmark = YoutubeBookmark.find(bookmark_id)
	      client = YouTubeIt::Client.new
		  vid = client.video_by(bookmark.url)

		  unless vid.state
		      bookmark.update_attributes(thumbnail_url: vid.thumbnails[0].url)
		      bookmark.update_attributes(title: vid.title)
		  end

	    end
	  rescue Exception => e
	  	Rails.logger.error "Failed to update youtube info for #{bookmark_id}, #{e}"
	  end 
  end

end
