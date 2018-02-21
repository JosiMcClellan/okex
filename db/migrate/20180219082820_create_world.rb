class CreateWorld < ActiveRecord::Migration[5.1]
  def change
    create_table :worlds do |t|
      t.string :hello
    end
  end
end
