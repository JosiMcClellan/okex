require_relative 'request_spec_helper'

describe 'communities#show' do
  it %{
    if it can't find a record,
      it returns an error message.
  } do
    get api_v1_community_path(7)
    expect(contents).to eq(error: 'route matches, but record not found')
    expect(response).to be_not_found
  end
  it %{
    returns one community as JSON, including:
      id,
      name,
      slug,
      description,
      image,
      founded,
      active
  } do
    get api_v1_community_path(create(:community))
    expect_shape(
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
