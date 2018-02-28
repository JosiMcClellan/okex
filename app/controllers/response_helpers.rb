module ResponseHelpers

  def okay(resource)
    render status: 200, json: resource
  end

  def created(resource)
    render status: 201, json: resource
  end

  def try_okay(resource)
    return okay resource if resource
    no_record
  end

  def try_created(resource)
    return created resource if resource.valid?
    send_error 500, resource.errors.full_messages
  end

  ### ERRORS ###
  def send_error(status, message)
    render status: status, json: { error: message }
    false
  end

  def bad_request
    send_error 400, 'bad request'
  end

  def unauthorized
    send_error 401, 'unauthorized'
  end

  def forbidden
    send_error 403, 'you do not have access to the requested route or resource'
  end

  def no_route
    send_error 404, 'no route matches, check your URL'
  end

  def no_record
    send_error 404, 'route matches, but record not found'
  end

  def general_error
    send_error 500, 'something went wrong'
  end

end
