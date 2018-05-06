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
    # high_match =
    # create(
    # :profile,
    #   community: joined,
    #   handle: 'good4u'
    # )
    # low_match =
    # create(
    # :profile,
    #   community: joined,
    #   handle: 'bad4u'
    # )

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
      text: 'answered match prompt'
    )
    fully_answered_match_prompt =
    create(
      :profile_prompt,
      community: joined,
      text: 'cared profile prompt'
    )

    ##### Match Responses #####
    create(
      :match_response,
      profile: profile,
      profile_prompt: minimally_answered_match_prompt,
      body: 'the old answer'
    )
    create(
      :match_response,
      profile: profile,
      profile_prompt: minimally_answered_match_prompt,
      answer: 3
    )
    create(
      :match_response,
      profile: profile,
      profile_prompt: fully_answered_match_prompt,
      answer: 7,
      ideal: 7,
      weight: 4,
      explanation: 'good explanation, yo'
    )
  end
end
