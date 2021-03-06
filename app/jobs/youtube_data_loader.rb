
class YoutubeDataLoader
	include SuckerPunch::Job

	def perform(bookmark_id)
		ActiveRecord::Base.connection_pool.with_connection do
			begin
				attempts ||= 3
				bookmark = YoutubeBookmark.find(bookmark_id)
				vid = YouTubeIt::Client.new.video_by(bookmark.url)
				bookmark.update_attributes(thumbnail_url: vid.thumbnails[0].url, title: vid.title) 
			rescue Exception => e
			  	if e.to_s == "403" #Forbidden 
			  		bookmark.update_attributes(thumbnail_url: "", title: "Removed video", removed: true)
			  	else
			  		retry unless (attempts -= 1).zero?
			  		Rails.logger.error "Failed to update youtube info for #{bookmark_id}, #{e}"
			  	end 
			  end

			end
		end
	end
