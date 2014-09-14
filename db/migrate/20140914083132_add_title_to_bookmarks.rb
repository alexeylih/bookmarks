class AddTitleToBookmarks < ActiveRecord::Migration
  def change
    add_column :bookmarks, :title, :text
  end
end
