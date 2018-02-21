require 'rails_helper'

describe 'Hello World', type: :request do
  it 'hello world!' do
    get api_v1_hello_world_path
    json = JSON.parse(response.body, symbolize_names: true)
    expect(json).to eq( hello: 'World' )
  end
end
