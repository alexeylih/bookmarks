require 'spec_helper'

describe YoutubeDataLoader, :integration do

  it "should update url and title for youtube bookmark" do
      bookmark = create(:youtube_bookmark, url: "https://www.youtube.com/watch?v=H2jCbXiEQI4")  
      YoutubeDataLoader.new.perform(bookmark.id)          
      #need to veriify bookmark state after 'perform' executed
  end

end