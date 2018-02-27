require 'rails_helper'

describe 'communities#index' do
  it %{
    if it can't find a record,
      it returns an empty array.
  } do
    get api_v1_communities_path
    expect(response.body).to eq('[]')
  end
  it %{
    returns all communties as JSON, including:
      id,
      name,
      slug,
      description,
      image_url,
      created_at,
      updated_at
  } do
    create_list(:community, 3)
    get api_v1_communities_path
    all = parse(response)
    expect(all.length).to eq(3)
    expect(all.first.keys).to contain_exactly(
      :id,
      :name,
      :slug,
      :description,
      :image_url,
      :created_at,
      :updated_at
    )
  end
end
