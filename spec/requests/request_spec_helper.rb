require 'rails_helper'

def contents
  JSON.parse(response.body, symbolize_names: true)
end

def token_header(account)
  { Authorization: "Token #{account.token}" }
end

def expect_shape(*keys)
  expect(contents.keys).to contain_exactly(*keys)
end

def expect_array_shape(length, *keys)
  expect(contents.length).to eq(length)
  expect(contents.first.keys).to contain_exactly(*keys)
end
