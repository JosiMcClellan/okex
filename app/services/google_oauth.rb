class GoogleOauth

  ENDPOINT = 'https://www.googleapis.com/oauth2/v4/token'

  def self.fetch_tokens(*args)
    new(*args).fetch_tokens
  end

  def initialize(code)
    @code = code
  end

  def fetch_tokens
    response = send_request
    JSON.parse(response.body)
  end

  private

    def send_request
      Faraday.post(ENDPOINT) do |req|
        req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        req.body = build_body
      end
    end

    def build_body
      {
        grant_type: 'authorization_code',
        code: @code,
        client_id: ENV['GOOGLE_CLIENT_ID'],
        client_secret: ENV['GOOGLE_CLIENT_SECRET'],
        redirect_uri: redirect_uri
      }
    end

    def redirect_uri
      if Rails.env.production?
        'https://okx.herokuapp.com' else 'http://localhost:3000'
      end
    end

end
