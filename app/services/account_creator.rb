class AccountCreator

  def self.create(*args)
    new(*args).create
  end

  def initialize(tokens)
    @tokens = tokens
  end

  def create
    if account.new_record?
      populate && welcome
    else
      account.touch
    end
    account
  end

  private

    def populate
      account.update(
        token: @tokens['access_token'],
        email: profile['email'],
        email_verified: profile['email_verified']
      )
    end

    def welcome
      SendGridService.new(account).welcome
    end

    def account
      @account ||= Account.find_or_initialize_by(uid: profile['sub'])
    end

    def profile
      @profile ||= JWT.decode(@tokens['id_token'], false, nil).first
    end

end
