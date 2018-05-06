class TestSeeder
  include FactoryBot::Syntax::Methods

  def seed
    DatabaseCleaner.clean_with(:truncation);

    create(:account,
      email: 'user@okx.herokuapp.com',
      token: 'legitUser'
    )
    member = create(:account,
      email: 'member@okx.herokuapp.com',
      token: 'legitMember'
    )
    create(:community,
      name: 'Fresh Community',
      image_url: '/communities/pahlka.jpg',
      description: 'member account has not joined yet'
    )
    joined = create(:community,
      name: 'Joined Community',
      image_url: '/communities/queerRights.png',
      description: 'member account has joined already'
    )
    profile = create(:profile,
      account: member,
      community: joined,
      handle: 'Cool Handle Uke'
    )
    create(:profile_prompt,
      community: joined,
      text: 'fresh profile prompt'
    )
    answered = create(:profile_prompt,
      community: joined,
      text: 'answered profile prompt'
    )
    create(:profile_response,
      profile: profile,
      profile_prompt: answered,
      body: 'the old answer'
    )
  end
end
