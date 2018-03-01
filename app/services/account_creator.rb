class AccountCreator

  def self.create(*args)
    creator = new(*args)
    creator.create
    creator.account
  end

  attr_reader :account
  def initialize(response)
    @response = response
  end

    private

    def create
      welcome if populate_created
    end

    def populate_created
      account.new_record? && account.update(
        token: tokens['access_token'],
        email: profile['email'],
        email_verified: profile['email_verified']
      )
    end

    def account
      @account ||= Account.find_or_initialize_by(uid: profile['sub'])
    end

    def profile
      @profile ||= JWT.decode(tokens['id_token'], false, nil).first
    end

    def tokens
      @tokens ||= JSON.parse(@response.body)
    end

    def welcome
      SendGrid.new(account).welcome
    end

end
