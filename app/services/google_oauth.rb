class GoogleOauth

  REDIRECT = 'http://localhost:3000'
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
        req.body = body
      end
    end

    def connection
      @connection ||= Faraday.new(API_URL) do |request|
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        request.adapter Faraday.default_adapter
      end
    end

    def fetch_tokens
      Faraday.post(ENDPOINT) do |req|
        req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        req.body = build_body
      end
    end

    def token_url
      'https://www.googleapis.com/oauth2/v4/token'
    end

    def build_body
      {
        code: @code,
        client_id: ENV['GOOGLE_CLIENT_ID'],
        client_secret: ENV['GOOGLE_CLIENT_SECRET'],
        redirect_uri: 'http://localhost:3000',
        grant_type: 'authorization_code'
      }
    end

end
