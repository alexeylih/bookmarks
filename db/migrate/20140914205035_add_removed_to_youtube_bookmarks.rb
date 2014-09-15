class AddRemovedToYoutubeBookmarks < ActiveRecord::Migration
  def change
    add_column :bookmarks, :removed, :boolean, :default => false
  end
end
