require_relative 'request_spec_helper'

describe 'communities#show' do
  context 'if no community matches' do
    specify 'it sends a not found error' do
      get api_v1_community_path(404101)
      expect_error(404)
    end
  end
  context 'if a community matches' do
    specify %{it sends the community with
      id,
      name,
      slug,
      description,
      image,
      founded,
      active
    } do
      get api_v1_community_path(create(:community))
      expect_response(200,
        id: Integer,
        name: String,
        slug: String,
        description: String,
        image: String,
        founded: String,
        active: String
      )
    end
  end
end
