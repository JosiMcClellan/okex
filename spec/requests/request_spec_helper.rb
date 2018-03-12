require 'rails_helper'

def token_header(token)
  { Authorization: "Token #{token}" }
end

def contents
  @contents ||= JSON.parse(response.body, symbolize_names: true)
rescue JSON::ParserError => error
  fail %{
    expected response body to be valid JSON, but got error: #{error}
    body was: #{response.body}
  }
end

def expect_error(status)
  expect_response(status, error: ShapeExpecter.one_of(String, [String]))
end

def expect_response(status, shape)
  expect_status(status)
  ShapeExpecter.new(shape, contents, 'contents').check
rescue ShapeExpecter::Error => e
  expect(true).to be(false), e.message
end

class ShapeExpecter
  class Error < Exception; end

  def self.any
    ->{ true }
  end

  def self.optional(matcher)
    one_of(nil, matcher)
  end

  def self.one_of(*matchers)
    ->(actual) do
      foo = matchers.any? do |matcher|
        new(matcher, actual, '').check
      rescue Error
        false else true
      end
    end
  end

  attr_accessor :shape, :actual, :location
  def initialize(shape, actual, location)
    @shape = shape
    @actual = actual
    @location = location
  end

  def check
    case shape
    when Array
      actual_should_match Array
      inner_shape = shape.first
      actual.each_with_index do |inner_actual, index|
        descend(inner_shape, inner_actual, index)
      end
    when Hash
      actual_should_match Hash
      shape.each do |key, inner_shape|
        descend(inner_shape, actual[key], key)
      end
    else
      actual_should_match shape
    end
  end

  def actual_should_match(matcher)
    unless matcher === actual
      raise Error, %{
        expected #{location} to match: #{matcher}
        actual:
        #{actual}
      }
    end
  end

  def descend(shape, actual, key)
    ShapeExpecter.new(shape, actual, "#{location}[#{key}]").check
  end

end

# def shape_failure(shape, actual, path)
# %{
#   expected #{path} to match: #{shape}
#   actual:
#   #{actual}
# }
# end

# RSpec::Matchers.define(:have_shape) do |shape, path|
#
#   define_method(:descend) do |actual, shape, key|
#     expect(actual).to have_shape(shape, "#{path}[#{key}]")
#   end
#
#   failure_message_for_should do |actual|
#     %{
#       expected #{path} to match: #{shape}
#       actual:
#       #{actual}
#     }
#   end
#
#   match do |actual|
#     case shape
#       when Array
#         return false unless actual.is_a? Array
#         inner_shape = shape.first
#         contents.each_with_index do |inner_actual, index|
#           descend(inner_contents, inner_shape, index)
#         end
#       when Hash
#         return false unless actual.is_a? Hash
#         shape.each do |key, inner_shape|
#           descend(actual[key], inner_shape, key)
#         end
#       else return shape === actual
#     end
#   end
# end

# deprecated
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
