class SendGridService
  include SendGrid

  def initialize(account)
    @account = account
  end

  def welcome(account)
    account[:email_verified] ? welcome_verified : welcome_unverified
  end

  private

    def send(subject, content)
      client.mail._('send').post(request_body: mail(subject, content))
    end

    def client
      SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY']).client
    end

    def mail(subject, content)
      Mail.new(from, subject, to, content).to_json
    end

    def from
      Email.new(email: 'noreply@okx.com')
    end

    def to
      Email.new(email: @account.email)
    end

    def plain(content)
      Content.new(type: 'text/plain', value: content)
    end

    def welcome_verified
      send(
        'Welcome to OKX!',
        plain('Please come back in a few weeks when we have... features.')
      )
    end

    def welcome_unverified
      send(
        'Please verify your email',
        plain(%{
          Please verify your account with google, because we have no process for that.
          Actually, we also have no process for updating your account, so...
          I guess your address will be forever "unverified" with us.
          Well, welcome anyway!
        })
      )
    end

  end

end
