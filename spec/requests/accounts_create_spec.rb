require_relative 'request_spec_helper'

describe 'accounts#create' do

  before do
    allow(GoogleOauth).to receive(:fetch_tokens).and_return({})
    allow(AccountCreator).to receive(:create).and_return(build(:account))
  end

  context 'with a non-bearer auth header' do
    specify 'it sends an unauthorized error' do
      header = { 'Authorization' => 'Token abc123' }
      post('/api/v1/account', headers: header)
      expect_error 401
    end
  end

  context 'with a proper header' do
    specify 'it it creates and sends account with id, email, and token' do
      header = { 'Authorization' => 'Bearer abc123' }
      post('/api/v1/account', headers: header)
      expect_response(201,
        email: String,
        token: String
      )
    end
  end
end
