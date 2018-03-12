class CreateProfilePrompts < ActiveRecord::Migration[5.1]
  def change
    create_table :profile_prompts do |t|
      t.references :community, foreign_key: true
      t.string :text, null: false
    end
  end
end
