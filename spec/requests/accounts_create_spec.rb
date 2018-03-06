require_relative 'request_spec_helper'

describe 'accounts#create' do

  before do
    allow(GoogleOauth).to receive(:fetch_tokens).and_return({})
    allow(AccountCreator).to receive(:create).and_return(build(:account))
  end

  it %{
    with a non-bearer auth header
      it sends an unauthorized error.
  } do
    headers = { 'Authorization' => 'Token abc123' }
    post api_v1_account_path, headers: headers
    expect_status 401
    expect_shape :error
  end

  it %{
    with a bearer auth header
      it creates and sends an account, including:
        id,
        email,
        token
  } do
    headers = { 'Authorization' => 'Bearer abc123' }
    post api_v1_account_path, headers: headers
    expect_status 201
    expect_shape :id, :email, :token
  end
end
