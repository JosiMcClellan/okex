class AddDescriptionToCommunities < ActiveRecord::Migration[5.1]
  def change
    add_column :communities, :description, :text
  end
end
