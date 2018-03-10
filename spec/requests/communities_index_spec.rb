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
    create_list(:community, 2)
    get '/api/v1/communities'
    expect_response(200, [{
      id: Integer,
      name: String,
      slug: String,
      description: String,
      image: String,
      founded: String,
      active: String
    }])
  end
end
