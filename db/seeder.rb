class Seeder
  include FactoryBot::Syntax::Methods

  def seed

    communities.each do |c|
      create(:community, **c) do |community|
        create_list(:profile, 10, community: community)
        10.times do
          create(:discussion, community: community, profile: random(community.profiles)) do |discussion|
            20.times do
              create(:post, discussion: discussion, profile: random(community.profiles))
            end
          end
        end
      end
    end

  end

  def random(assoc)
    assoc.order('RANDOM()').first
  end

  def communities
    [
      {
        name: 'Ecology'
      },
      {
        name: 'Accessibility'
      },
      {
        name: 'Antiracism'
      },
      {
        name: 'Feminism'
      },
      {
        name: 'Poverty'
      },
      {
        name: 'Queer Rights'
      },
      {
        name: 'Code for America',
        image_url: 'https://s3-us-west-1.amazonaws.com/codeforamerica-cms1/profile-photos/jennifer-pahlka.jpg',
        description: 'We are a network of people making government work for the people, by the people, in the 21st century. How do we get there? Government services that are simple, effective, and easy to use, working at scale to build healthy, prosperous, and safe communities.'
      },
      {
        name: 'Animal Rights'
      },
      {
        # let Faker have one for now ;)
      }
    ]
  end

end
