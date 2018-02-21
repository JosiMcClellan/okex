require 'rails_helper'

describe World do
  it 'can have a hello' do
    expect(World.new(hello: 'world')).to be_valid
  end
end
