class CreateProfileResponses < ActiveRecord::Migration[5.1]
  def change
    create_table :profile_responses do |t|
      t.references :profile_prompt, foreign_key: true
      t.references :profile, foreign_key: true
      t.text :body, null: false

      t.index [:profile_id, :profile_prompt_id], unique: true
    end
  end
end
