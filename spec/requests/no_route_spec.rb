require_relative 'request_spec_helper'

describe 'no_route#show' do
  specify 'when no route matches, it sends a not found error' do
    get '/api/v1/totally/bogus/route'
    expect_error 404
  end
end
