class GoogleOauth

  ENDPOINT = 'https://www.googleapis.com/oauth2/v4/token'

  def self.fetch_tokens(*args)
    new(*args).fetch_tokens
  end

  def initialize(code)
    @code = code
  end

  def fetch_tokens
    Faraday.post(ENDPOINT) do |req|
      req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      req.body = build_body
    end
  end

  private

    def build_body
      {
        grant_type: 'authorization_code',
        code: @code,
        client_id: ENV['GOOGLE_CLIENT_ID'],
        client_secret: ENV['GOOGLE_CLIENT_SECRET'],
        redirect_uri: '/'
      }
    end

end
