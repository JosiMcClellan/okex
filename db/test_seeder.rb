class TestSeeder
  include FactoryBot::Syntax::Methods

  def seed
    DatabaseCleaner.clean_with(:truncation);

    ##### Accounts #####
    create(
      :account,
      email: 'user@okx.herokuapp.com',
      token: 'legitUser'
    )
    member =
    create(
      :account,
      email: 'member@okx.herokuapp.com',
      token: 'legitMember'
    )

    ##### Communities #####
    create(
      :community,
      name: 'Fresh Community',
      image_url: '/communities/pahlka.jpg',
      description: 'member account has not joined yet'
    )
    joined =
    create(
      :community,
      name: 'Joined Community',
      image_url: '/communities/queerRights.png',
      description: 'member account has joined already'
    )

    ##### Profiles #####
    profile =
    create(
      :profile,
      account: member,
      community: joined,
      handle: 'Cool Handle Uke'
    )
    high_match =
    create(
    :profile,
      community: joined,
      handle: 'good4u'
    )
    low_match =
    create(
    :profile,
      community: joined,
      handle: 'bad4u'
    )

    ##### Profile Prompts #####
    create(
      :profile_prompt,
      community: joined,
      text: 'fresh profile prompt'
    )
    answered_profile_prompt =
    create(
      :profile_prompt,
      community: joined,
      text: 'answered profile prompt'
    )

    ##### Profile Responses #####
    create(
      :profile_response,
      profile: profile,
      profile_prompt: answered_profile_prompt,
      body: 'the old answer'
    )

    ##### Match Prompts #####
    create(
      :match_prompt,
      community: joined,
      text: 'fresh match prompt'
    )
    minimally_answered_match_prompt =
    create(
      :match_prompt,
      community: joined,
      text: 'minimally answered match prompt'
    )
    fully_answered_match_prompt =
    create(
      :match_prompt,
      community: joined,
      text: ' fully answered profile prompt'
    )

    ##### Match Responses #####
    create(
      :match_response,
      match_prompt: minimally_answered_match_prompt,
      profile: profile,
      answer: 3
    )
    create(
      :match_response,
      match_prompt: fully_answered_match_prompt,
      profile: profile,
      answer: 7,
      ideal: 7,
      weight: 4,
      explanation: 'good explanation, yo'
    )

    ##### Discussions #####
    distant_discussion =
    create(
      :discussion,
      community: joined,
      # profile: ,
      topic: "distantly active thread",
      created_at: Date.new(2000,1,2),
      updated_at: Date.new(2000,1,3)
    )
    recent_discussion =
    create(
      :discussion,
      community: joined,
      # profile: ,
      topic: "recently active thread",
      created_at: Date.new(2000,1,1),
      updated_at: Date.new(2000,1,4)
    )

    ##### Posts #####
    create(
      :post,
      discussion: distant_discussion,
      body: "distant post",
      created_at: Date.new(2000,1,1)
    )
    create(
      :post,
      discussion: distant_discussion,
      body: "recent post",
      created_at: Date.new(2000,1,2)
    )

    distant_discussion.update(updated_at: Date.new(2000,1,3))
  end

end
