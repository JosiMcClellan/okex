require_relative 'request_spec_helper'

describe 'communities#index' do
  it %{
    if it can't find a record,
      it returns an empty array.
  } do
    get api_v1_communities_path
    expect(response).to be_ok
    expect(contents).to eq([])
  end
  it %{
    returns all communties as JSON, including:
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
    expect(contents.length).to eq(3)
    expect(contents.first.keys).to contain_exactly(
      :id,
      :name,
      :slug,
      :description,
      :image,
      :founded,
      :active
    )
    expect(response).to be_ok
  end
end
