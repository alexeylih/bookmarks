class AddThumbnailUrlToBookmarks < ActiveRecord::Migration
  def change
    add_column :bookmarks, :thumbnail_url, :text
  end
end
