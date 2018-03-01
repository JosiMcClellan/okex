require_relative 'request_spec_helper'

describe 'accounts#create' do

  before do

  end

  it %{
    with a non-bearer auth header
      it renders unauthorized.
  } do
    headers = { 'Authorization' => 'Token abc123' }
    post api_v1_account_path, headers: headers

    expect(Account.count).to eq(0)
    expect(response).to be_unauthorized
    expect_shape :error
  end

  it %{
    with a bearer auth header
      it creates and returns an account, including:
        id,
        email,
        token,
  } do
    allow(GoogleOauth).to receive(:fetch_tokens).and_return({})
    allow(AccountCreator).to receive(:create).and_return(create(:account))
    headers = { 'Authorization' => 'Bearer abc123' }
    post api_v1_account_path, headers: headers

    expect(Account.count).to eq(1)
    expect(response).to be_created
    expect_shape :id, :email, :token
  end
end
