class AccountCreator

  def initialize(response)
    @response = response
    @attrs = {}
  end

  def create
    tokens = JSON.parse(@response.body)
    profile = JWT.decode(tokens['id_token'], false, nil).first
    account = Account.find_or_initialize_by(uid: profile['sub'])
    account.persisted? || account.update(
      token: tokens['access_token'],
      email: profile['email'],
      email_verified: profile['email_verified']
    )
    account
  end

end
