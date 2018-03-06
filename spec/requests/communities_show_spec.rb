require_relative 'request_spec_helper'

describe 'communities#show' do
  it %{
    if there's no community,
      it sends a not found error.
  } do
    get api_v1_community_path(7)
    expect_status 404
    expect(contents).to eq(error: 'route matches, but record not found')
  end
  it %{
    if there is a community
      it sends the community, including:
        id,
        name,
        slug,
        description,
        image,
        founded,
        active
  } do
    get api_v1_community_path(create(:community))
    expect_status 200
    expect_shape(
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
