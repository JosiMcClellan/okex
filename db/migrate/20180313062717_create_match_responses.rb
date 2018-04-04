class CreateMatchResponses < ActiveRecord::Migration[5.1]
  def change
    create_table :match_responses do |t|
      t.references :match_prompt, foreign_key: true
      t.references :profile, foreign_key: true
      t.integer :answer
      t.integer :ideal
      t.integer :weight
      t.text :explanation

      t.index [:profile_id, :match_prompt_id], unique: true
    end
  end
end
