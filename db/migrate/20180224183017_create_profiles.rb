class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.belongs_to :account, foreign_key: true
      t.belongs_to :community, foreign_key: true
      t.string :handle, null: false
      t.integer :role, default: 0, null: false

      t.index [:account_id, :community_id], unique: true
      t.index [:community_id, :handle], unique: true
    end
  end
end
