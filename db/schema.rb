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

ActiveRecord::Schema.define(version: 20180313062717) do

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

  create_table "discussions", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "community_id"
    t.string "topic", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["community_id"], name: "index_discussions_on_community_id"
    t.index ["profile_id"], name: "index_discussions_on_profile_id"
    t.index ["updated_at"], name: "index_discussions_on_updated_at"
  end

  create_table "match_prompts", force: :cascade do |t|
    t.bigint "community_id"
    t.string "text", null: false
    t.index ["community_id"], name: "index_match_prompts_on_community_id"
  end

  create_table "match_responses", force: :cascade do |t|
    t.bigint "match_prompt_id"
    t.bigint "profile_id"
    t.integer "answer"
    t.integer "ideal"
    t.integer "weight"
    t.text "explanation"
    t.index ["match_prompt_id"], name: "index_match_responses_on_match_prompt_id"
    t.index ["profile_id", "match_prompt_id"], name: "index_match_responses_on_profile_id_and_match_prompt_id", unique: true
    t.index ["profile_id"], name: "index_match_responses_on_profile_id"
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "discussion_id"
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_posts_on_created_at"
    t.index ["discussion_id"], name: "index_posts_on_discussion_id"
    t.index ["profile_id"], name: "index_posts_on_profile_id"
  end

  create_table "profile_prompts", force: :cascade do |t|
    t.bigint "community_id"
    t.string "text", null: false
    t.index ["community_id"], name: "index_profile_prompts_on_community_id"
  end

  create_table "profile_responses", force: :cascade do |t|
    t.bigint "profile_prompt_id"
    t.bigint "profile_id"
    t.text "body", null: false
    t.index ["profile_id", "profile_prompt_id"], name: "index_profile_responses_on_profile_id_and_profile_prompt_id", unique: true
    t.index ["profile_id"], name: "index_profile_responses_on_profile_id"
    t.index ["profile_prompt_id"], name: "index_profile_responses_on_profile_prompt_id"
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

  add_foreign_key "discussions", "communities"
  add_foreign_key "discussions", "profiles"
  add_foreign_key "match_prompts", "communities"
  add_foreign_key "match_responses", "match_prompts"
  add_foreign_key "match_responses", "profiles"
  add_foreign_key "posts", "discussions"
  add_foreign_key "posts", "profiles"
  add_foreign_key "profile_prompts", "communities"
  add_foreign_key "profile_responses", "profile_prompts"
  add_foreign_key "profile_responses", "profiles"
  add_foreign_key "profiles", "accounts"
  add_foreign_key "profiles", "communities"
end
