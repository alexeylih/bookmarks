class AddTypeToBookmarks < ActiveRecord::Migration
  def change
    add_column :bookmarks, :type, :text
  end
end
