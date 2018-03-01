class Seeder
  include FactoryBot::Syntax::Methods

  def seed_communities
    fixed_communities.each do |c|
      create(:community, **c)
    end
  end

  def seed_accounts
    create_list(:account, 50) do |account|
      seed_account_profiles(account)
    end
  end

  def seed_account_profiles(account)
    communities = pick_random(rand(2..5), Community)
    communities.each do |community|
      create(:profile, community: community, account: account)
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
      rescue Exception => e
        require "pry"; binding.pry
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

  def fixed_communities
    [
      {
        name: 'Ecology'
        # image_url: '',
        # description:
      },
      {
        name: 'Accessibility'
        # image_url: '',
        # description:
      },
      {
        name: 'Antiracism',
        image_url: 'https://78.media.tumblr.com/810b6d7949cc4159b48ceb58b3297b78/tumblr_mtlphyXKge1sb3v5jo1_500.jpg'
        # description:
      },
      {
        name: 'Feminism',
        image_url: 'https://en.wikipedia.org/wiki/Bell_hooks#/media/File:Bell_hooks,_October_2014.jpg',
        # http://www.orangenarwhals.com/wp-content/uploads/2015/08/hack4femlogo.svg
        description: '"Ayo, these days I\'m on a Bell Hooks tip, and through that prism, many of you, well, look s***." -KTP'
      },
      {
        name: 'Anti Poverty',
        image_url: 'https://video-images.vice.com/_uncategorized/1495207476572-MONOPOLY_PROTEST4.jpeg?resize=1050',
        description: '"Everybody knows the deal is rotten, Old Black Joe\'s still picking cotton for your ribbons and bows, and everybody knows" -L. Cohen'
        # http://www.eapn.ie/eapn/wp-content/uploads/2017/02/end-poverty-logo.jpg
        # http://www.antipovertynetwork.org/resources/Pictures/APN_2015_SummitLogo%20copy.jpg
      },
      {
        name: 'Queer Rights',
        image_url: 'https://78.media.tumblr.com/9f128d28bd7cb2104de83c96aae354cd/tumblr_od7bq205cT1rxif0no5_400.gif'
        # description: ""
        # 'https://blog.animationstudies.org/wp-content/uploads/2017/04/Garnetop.png'
        # 'https://cdn2.desu-usergeneratedcontent.xyz/co/image/1446/00/1446006960475.jpg'
        # 'https://cdn2.desu-usergeneratedcontent.xyz/co/image/1478/05/1478054525204.png'

      },
      {
        name: 'Code for America',
        image_url: 'https://s3-us-west-1.amazonaws.com/codeforamerica-cms1/profile-photos/jennifer-pahlka.jpg',
        description: 'We are a network of people making government work for the people, by the people, in the 21st century. How do we get there? Government services that are simple, effective, and easy to use, working at scale to build healthy, prosperous, and safe communities.'
      },
      {
        name: 'Animal Rights'
        # image_url: '',
        # description:
      },
      {
        name: 'Free Speech'
        # image_url: '',
        # description:
      }
    ]
  end

end
