require_relative 'request_spec_helper'

describe 'pongs#show' do
  it 'is just ok' do
    get api_v1_ping_path
    expect_status 200
    expect(response.body).to eq('OK')
  end
end
