class AuthHeader

  def self.extract(type, header)
    new(type, header).extract
  end

  def initialize(type, header)
    @type, @header = type, header
  end

  def extract
    match && match.captures.first
  end

  private

    def match
      pattern.match(@header)
    end

    def pattern
      /#{@type} (.+)/
    end

end
