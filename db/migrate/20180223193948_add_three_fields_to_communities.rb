class AddThreeFieldsToCommunities < ActiveRecord::Migration[5.1]
  def change
    change_table :communities do |t|
      t.text :description, null: false
      t.string :image_url, null: false
      t.string :slug, null: false
    end
  end
end
