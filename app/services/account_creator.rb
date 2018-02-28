require 'sendgrid-ruby'

class AccountCreator
  include SendGrid

  def welcome!(account)
    if account[:email_verified]
      subject = 'Welcome to OKX!'
      content = Content.new(type: 'text/plain', value: 'Make sure to come back in a month when we have... features.')
    else
      subject = 'Please verify your email'
      content = Content.new(type: 'text/plain', value: 'Please verify your account with google or something, because we have no process for that.  We also have no process for deleting/updating your account, so... I guess it matters not, your address will forever be "unverified" with us.  Whatevs.  Well, welcome anyway!')
    end
    from = Email.new(email: 'noreply@okx.com')
    to = Email.new(email: account.email)
    mail = Mail.new(from, subject, to, content)
    sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
    sg.client.mail._('send').post(request_body: mail.to_json)
  end

  def initialize(response)
    @response = response
    @attrs = {}
  end

  def create
    tokens = JSON.parse(@response.body)
    profile = JWT.decode(tokens['id_token'], false, nil).first
    account = Account.find_or_initialize_by(uid: profile['sub'])
    created = account.new_record? && account.update(
      token: tokens['access_token'],
      email: profile['email'],
      email_verified: profile['email_verified']
    )
    welcome!(account) if created
    account
  end

end
