class CreateThreads < ActiveRecord::Migration[5.1]
  def change
    create_table :discussions do |t|

      t.references :profile, index: true, foreign_key: true
      t.references :community, index: true, foreign_key: true
      t.string :topic, null: false
      t.timestamps

    end
  end
end
