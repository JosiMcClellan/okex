# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180224183017) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "uid", null: false
    t.string "email", null: false
    t.boolean "email_verified", null: false
    t.string "token", null: false
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_accounts_on_email", unique: true
    t.index ["uid"], name: "index_accounts_on_uid", unique: true
  end

  create_table "communities", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.text "description", null: false
    t.string "image_url", null: false
    t.string "slug", null: false
    t.index ["name"], name: "index_communities_on_name", unique: true
  end

  create_table "profiles", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "community_id"
    t.string "handle", null: false
    t.string "slug", null: false
    t.integer "role", default: 0, null: false
    t.index ["account_id", "community_id"], name: "index_profiles_on_account_id_and_community_id", unique: true
    t.index ["account_id"], name: "index_profiles_on_account_id"
    t.index ["community_id", "handle"], name: "index_profiles_on_community_id_and_handle", unique: true
    t.index ["community_id"], name: "index_profiles_on_community_id"
  end

  create_table "worlds", force: :cascade do |t|
    t.string "hello"
  end

  add_foreign_key "profiles", "accounts"
  add_foreign_key "profiles", "communities"
end
