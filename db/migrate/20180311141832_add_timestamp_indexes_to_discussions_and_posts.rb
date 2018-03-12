class AddTimestampIndexesToDiscussionsAndPosts < ActiveRecord::Migration[5.1]
  def change
    add_index :discussions, :updated_at
    add_index :posts, :created_at
  end
end
