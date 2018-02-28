class CreateCommunities < ActiveRecord::Migration[5.1]
  def change
    create_table :communities do |t|
      t.timestamps
      t.string :name
      t.index :name, unique: :true
    end
  end
end
