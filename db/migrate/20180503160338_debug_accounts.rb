class DebugAccounts < ActiveRecord::Migration[5.1]
  def change
    change_table :accounts do |t|
      t.change :email_verified, :string # remove null constraint to allow false
      t.rename :uid, :google_sub # clarify which uid
    end
  end
end
