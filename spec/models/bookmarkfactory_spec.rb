require 'spec_helper'

describe BookmarkFactory do
  it "should create Bookmark for http://www.reddit.com" do
  	expect(BookmarkFactory.create('http://www.reddit.com')).to be_an Bookmark
  end

  it "should create Bookmark for http://www.youtube.com" do
  	expect(BookmarkFactory.create('http://www.youtube.com')).to be_an Bookmark
  end

  it "should create YoutubeBookmark for https://www.youtube.com/watch?v=NHOf3s70w-c" do
  	expect(BookmarkFactory.create('https://www.youtube.com/watch?v=NHOf3s70w-c')).to be_an YoutubeBookmark
  end

  it "should create YoutubeBookmark for https://www.youtu.be/watch?v=NHOf3s70w-c" do
  	expect(BookmarkFactory.create('https://www.youtu.be/watch?v=NHOf3s70w-c')).to be_an YoutubeBookmark
  end

end