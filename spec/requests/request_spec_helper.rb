require 'rails_helper'

def token_header(account)
  { Authorization: "Token #{account.token}" }
end

def contents
  JSON.parse(response.body, symbolize_names: true)
end

def expect_status(code)
  expect(response.status).to eq(code)
end

def expect_shape(*keys)
  expect(contents.keys).to contain_exactly(*keys)
end

def expect_array_shape(length, *keys)
  expect(contents.length).to eq(length)
  expect(contents.first.keys).to contain_exactly(*keys)
end
