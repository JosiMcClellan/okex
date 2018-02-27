require 'rails_helper'

describe 'communities#show' do
  it %{
    if it can't find a record,
      it returns an error message.
  } do
    get api_v1_community_path(7)
    expect(parse(response)).to eq(error: 'record not found')
    expect(response.status).to eq(404)
  end
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
    get api_v1_community_path(create(:community))
    keys = parse(response).keys
    expect(keys).to contain_exactly(
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
