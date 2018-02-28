require_relative 'request_spec_helper'

describe 'accounts#create' do

  before do
    allow_any_instance_of(AccountCreator)
      .to receive(:create)
      .and_return(build(:account))
    allow_any_instance_of(Api::V1::AccountsController)
      .to receive(:request_tokens)
      .and_return({})
  end

  it %{
    with a non-bearer auth header
      it returns an error.
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
    allow_any_instance_of(AccountCreator)
      .to receive(:create)
      .and_return(create(:account))
    headers = { 'Authorization' => 'Bearer abc123' }
    post api_v1_account_path, headers: headers

    expect(Account.count).to eq(1)
    expect(response).to be_created
    expect_shape :id, :email, :token
  end
end
