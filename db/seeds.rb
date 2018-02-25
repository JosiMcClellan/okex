Community.delete_all

communities = [
  {
    name: 'Ecology'
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
    name: 'Animal Rights'
  },
  {
    name: 'Government'
  }
]

communities.each do |c|
  FactoryBot.create(:community, **c)
end
