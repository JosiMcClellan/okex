class GoogleOauth

  REDIRECT_URI = 'http://localhost:3000'
  API_URL = 'https://www.googleapis.com'
  TOKEN_PATH = '/oauth2/v4/token'

  def self.fetch_tokens(*args)
    new(*args).fetch_tokens
  end

  def initialize(code)
    @code = code
  end

  private

    def fetch_tokens
      connection.post(TOKEN_PATH) do |request|
        request.body = build_body
      end
    end

    def connection
      @connection ||= Faraday.new(API_URL) do |request|
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        request.adapter Faraday.default_adapter
      end
    end

    def body
      {
        code: @code,
        client_id: ENV['GOOGLE_CLIENT_ID'],
        client_secret: ENV['GOOGLE_CLIENT_SECRET'],
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      }
    end

end
