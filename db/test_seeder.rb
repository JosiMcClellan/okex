class TestSeeder
  include FactoryBot::Syntax::Methods

  ACCOUNTS = [{
    email: 'default@okx.herokuapp.com',
    token: 'totesLegit'
  }]

  COMMUNITIES = [{
    name: 'Community1',
    description: 'this is the first community',

  }, {
    name: 'Community2',
    description: 'this is the second community',
  }]

  PROFILE_PROMPTS = [{
    text: 'this is a profile prompt'
  }]

  MATCH_PROMPTS = [{
    text: 'this is a match prompt'
  }]

  def create_from_list(type, list, defaults = {}, &block)
    list.map { |data| create(type, defaults.merge(data), &block) }
  end

  def seed
    create_from_list(:community, COMMUNITIES) do |community|
      create_from_list(:profile_prompt, PROFILE_PROMPTS, community: community)
      create_from_list(:match_prompt, MATCH_PROMPTS, community: community)
    end
    create_from_list(:account, ACCOUNTS)
  end

end
