class Seeder
  include FactoryBot::Syntax::Methods

  def seed_communities
    community_fixtures.each do |fixture|
      community = create(:community, **fixture)
      seed_community_profile_prompts(community)
    end
  end

  def seed_community_profile_prompts(community)
    rand(4..10).times { create(:profile_prompt, community: community) }
  end

  def seed_accounts
    create_list(:account, 60) do |account|
      seed_account_profiles(account)
    end
  end

  def seed_account_profiles(account)
    communities = pick_random(rand(2..5), Community)
    communities.each do |community|
      profile = create(:profile, community: community, account: account)
      seed_profile_responses(profile)
    end
  end

  def seed_profile_responses(profile)
    prompts = profile.community.profile_prompts
    answered = pick_random(prompts.count, prompts)
    answered.each do |prompt|
      create(:profile_response, profile: profile, profile_prompt: prompt)
    end
  end

  def seed_discussions
    Community.all.each do |community|
      rand(10..25).times do
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
    rand(5..50).times do
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
        # image_url: 'https://78.media.tumblr.com/9f128d28bd7cb2104de83c96aae354cd/tumblr_od7bq205cT1rxif0no5_400.gif'
        # 'https://blog.animationstudies.org/wp-content/uploads/2017/04/Garnetop.png'
        # 'https://cdn2.desu-usergeneratedcontent.xyz/co/image/1446/00/1446006960475.jpg'
        # 'https://cdn2.desu-usergeneratedcontent.xyz/co/image/1478/05/1478054525204.png'

      },
      {
        name: 'Pahlka Posse',
        image_url: '/communities/pahlka.jpg',
        description: 'We are a network of people making government work for the people, by the people, in the 21st century. How do we get there? Government services that are simple, effective, and easy to use, working at scale to build healthy, prosperous, and safe communities.'
      },
      {
        name: 'Animal Rights',
        image_url: '/communities/animalRights.jpg'
        # description:
      },
      {
        name: 'Free Speech',
        image_url: '/communities/freeSpeech.jpg',
        description: 'Come fight for the free exchange of ideas which underpins all other rights.'
      }
    ]
  end

end
