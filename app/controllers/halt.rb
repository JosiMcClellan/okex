class Halt < StandardError

  attr_reader :status, :data
  def initialize(status, jsonable)
    @status = status
    @data = jsonable
  end

  class << self

    def found(data)
      no_record unless data
      new 200, data
    end

    def saved(record)
      cant_save(record) unless record.save
      new 201, record
    end

    def cant_save(record)
      unprocessable(record.errors.full_messages)
    end

    def bad_request(message = 'bad request')
      new 400, message
    end

    def unauthorized(message = 'unauthorized')
      new 401, message
    end

    def forbidden(message = 'you don\'t have permission to make that request')
      new 403, message
    end

    def no_route(message = 'no route matches, check your URL')
      new 404, message
    end

    def no_record(message = 'route matches, but nothing found')
      new 404, message
    end

    def unprocessable(message = 'unprocessable')
      new 422, message
    end

    def generic(message = 'something went wrong')
      new 500, message
    end

  end

end
