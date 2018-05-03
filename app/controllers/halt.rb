module Halt
  class << self

    TAG = :halt!

    def throw(*args)
      super(TAG, args)
    end

    def catch
      super(TAG) do
        yield
        generic_error('no response')
      rescue PG::Error, ActiveRecord::ActiveRecordError => error
        unprocessable error.message
      end
    end

    def found(data)
      not_found unless data
      throw 200, data
    end

    def saved(record)
      invalid(record) unless record.save
      throw 201, record
    end

    def no_content
      throw 204, {}
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

    def not_found(message = 'route matches, but nothing found')
      throw 404, message
    end

    def no_route
      not_found('no route matches, check your URL')
    end

    def unprocessable(message = 'unprocessable')
      throw 422, message
    end

    def invalid(record)
      unprocessable(record.errors.full_messages)
    end

    def generic_error(message = 'something went wrong')
      throw 500, message
    end

    def no_response
      generic_error('no response')
    end

  end
end
