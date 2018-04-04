module Halts

  TAG = :halt_and_render

  class << self

    def throw(*args)
      super(TAG, args)
    end

    # No reason to make these static, except that
    # I like to see `Halts.whatever` for clarity over `whatever`

    def found(data)
      no_record unless data
      throw 200, data
    end

    def saved(record)
      invalid(record) unless record.save
      throw 201, record
    end

    def bad_request(message = 'bad request')
      throw 400, message
    end

    def unauthorized(message = 'unauthorized')
      throw 401, message
    end

    def forbidden(message = 'you don\'t have permission to make that request')
      throw 403, message
    end

    def no_record(message = 'route matches, but nothing found')
      throw 404, message
    end

    def unprocessable(message = 'unprocessable')
      throw 422, message
    end

    def invalid(record)
      throw 422, record.errors.full_messages
    end

    def generic(message = 'something went wrong')
      throw 500, message
    end

  end
end
