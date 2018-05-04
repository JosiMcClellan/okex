class CreateAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :accounts do |t|
      t.string :uid, index: { unique: true }, null: false
      t.string :email, index: { unique: true }, null: false
      t.boolean :email_verified, null: false
      t.string :token, null: false
      t.integer :role, default: 0, null: false
      t.timestamps
    end
  end
end
