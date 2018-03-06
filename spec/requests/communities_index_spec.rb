require_relative 'request_spec_helper'

describe 'communities#index' do
  it %{
    it sends all communties, including:
      id,
      name,
      slug,
      description,
      image,
      founded,
      active
  } do
    create_list(:community, 3)
    get api_v1_communities_path
    expect_status 200
    expect_array_shape(
      3,
      :id,
      :name,
      :slug,
      :description,
      :image,
      :founded,
      :active
    )
  end
end
