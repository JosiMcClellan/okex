require 'rails_helper'

describe 'communities#index' do
  it %{
    returns all communties as JSON, including:
      id,
      name,
      description,
      created_at,
      updated_at
  } do
    create_list(:community, 3).map &:id
    get api_v1_communities_path
    all = JSON.parse(response.body, symbolize_names: true)
    expect(all.length).to eq(3)
    expect(all.first).to contain_exactly(
      :id,
      :name,
      :description,
      :created_at,
      :updated_at
    )
  end
end
