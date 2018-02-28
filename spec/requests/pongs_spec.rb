require_relative 'request_spec_helper'

describe 'pongs#show' do
  it 'is just ok' do
    get api_v1_ping_path
    expect(response).to be_ok
    expect(response.body).to eq('OK')
  end
end
