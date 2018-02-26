require 'rails_helper'

describe 'communities#show' do
  it %{
    returns one community as JSON, including:
      id,
      name,
      slug,
      description,
      image_url,
      created_at,
      updated_at
  } do
    get show_api_v1_community_path(create(:community))
    actual = JSON.parse(response.body, symbolize_names: true)
    expect(actual.keys).to contain_exactly(
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
