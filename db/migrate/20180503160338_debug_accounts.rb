class DebugAccounts < ActiveRecord::Migration[5.1]
  def change
    change_table :accounts do |t|
      t.change :email_verified, :string, default: false
      t.rename :uid, :google_sub
    end
  end
end
