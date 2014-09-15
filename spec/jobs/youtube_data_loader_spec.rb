require 'spec_helper'

#integration test, depends on youtube service :((

describe YoutubeDataLoader do

  it "should update url and title for youtube bookmark" do
      bookmark = create(:youtube_bookmark, url: "https://www.youtube.com/watch?v=H2jCbXiEQI4")  
      YoutubeDataLoader.new.perform(bookmark.id)          
      #
  end

end