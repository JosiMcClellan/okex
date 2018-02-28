require_relative 'request_spec_helper'

describe 'Hello,' do
  it 'World!' do
    get api_v1_hello_world_path
    expect(contents).to eq(hello: 'World')
  end
end
