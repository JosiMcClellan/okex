class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|

      t.references :profile, index: true, foreign_key: true
      t.references :discussion, index: true, foreign_key: true
      t.text :body, null: false
      t.timestamps

    end
  end
end
