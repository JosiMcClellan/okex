class Seeder
  include FactoryBot::Syntax::Methods

  ACCOUNTS = 60
  ACCOUNT_PROFILES = 1..5
  COMMUNITY_PROFILE_PROMPTS = 4..8
  COMMUNITY_MATCH_PROMPTS = 5..20
  COMMUNITY_DISCUSSIONS = 5..25
  DISCUSSION_POSTS = 5..50


  def seed_communities
    community_fixtures.each do |fixture|
      community = create(:community, **fixture)
      seed_community_prompts(community)
    end
  end

  def seed_community_prompts(community)
    rand(COMMUNITY_PROFILE_PROMPTS)
      .times { create(:profile_prompt, community: community) }
    rand(COMMUNITY_MATCH_PROMPTS)
      .times { create(:match_prompt, community: community) }
  end

  def seed_accounts
    create_list(:account, ACCOUNTS) do |account|
      seed_account_profiles(account)
    end
  end

  def seed_account_profiles(account)
    communities = pick_random(rand(ACCOUNT_PROFILES), Community)
    communities.each do |community|
      profile = create(:profile, community: community, account: account)
      seed_profile_responses(profile)
      seed_match_responses(profile)
    end
  end

  def seed_profile_responses(profile)
    prompts = profile.community.profile_prompts
    answered = pick_random(prompts.count, prompts)
    answered.each do |prompt|
      create(:profile_response, profile: profile, profile_prompt: prompt)
    end
  end

  def seed_match_responses(profile)
    prompts = profile.community.match_prompts
    answered = pick_random(prompts.count, prompts)
    answered.each do |prompt|
      create(:match_response, profile: profile, match_prompt: prompt)
    end
  end

  def seed_discussions
    Community.all.each do |community|
      rand(COMMUNITY_DISCUSSIONS).times do
        create(:discussion,
          community: community,
          profile: pick_random(community.profiles).first || create(:profile, community: community)
        ) do |discussion|
          seed_discussion_posts(discussion)
        end
      end
    end
  end

  def seed_discussion_posts(discussion)
    rand(DISCUSSION_POSTS).times do
      create(:post,
        discussion: discussion,
        profile: pick_random(discussion.community.profiles).first
      )
    end
  end

  def seed
    Faker::UniqueGenerator.clear
    seed_communities
    seed_accounts
    seed_discussions
  end

  def pick_random(n = 1, assoc)
    assoc.order('RANDOM()').first(n)
  end

  def community_fixtures
    [
      {
        name: 'Environmentalism',
        image_url: '/communities/environmentalism.jpg',
        description: 'We care about the environment and its conservation.'
      },
      {
        name: 'Accessibility',
        image_url: '/communities/accessibility.png',
        description: 'We care about and discuss differing physical and intellectual experiences, and their ability to access the world.'
      },
      {
        name: 'Antiracism',
        image_url: '/communities/antiracism.jpg',
        description: 'We oppose racism/colorism and seek many forms of sustained action to build understanding and break down prejudices.'
      },
      {
        name: 'Feminism',
        image_url: '/communities/feminism.png',
        description: 'We believe there is social, economic, or financial disparity between the genders and that this difference is wrong.'
      },
      {
        name: 'Anti Poverty',
        image_url: '/communities/antipoverty.jpg',
        description: %{We connect on the multifaceted issues surrounding poverty, including its causes, effects, and how to solve.},
      },
      {
        name: 'Queer Rights',
        image_url: '/communities/queerRights.png',
        description: 'We support all those under the Queer umbrella (LGBTQA+), and their right to life, love, and happiness.'
      },
      {
        name: 'Pahlka Posse',
        image_url: '/communities/pahlka.jpg',
        description: 'We are a network of people making government work for the people, by the people, in the 21st century. How do we get there? Government services that are simple, effective, and easy to use, working at scale to build healthy, prosperous, and safe communities.'
      },
      {
        name: 'Animal Rights',
        image_url: '/communities/animalRights.jpg'
      },
      {
        name: 'Free Speech',
        image_url: '/communities/freeSpeech.jpg',
        description: 'Come fight for the free exchange of ideas which underpins all other rights.'
      }
    ]
  end

end
