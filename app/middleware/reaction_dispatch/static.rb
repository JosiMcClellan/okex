module ReactionDispatch
  class Static < ActionDispatch::Static
    def call(env)
      req = Rack::Request.new(env)
      return serve_react(req) if should_serve_react?(req)
      @app.call(req.env)
    end

    def serve_react(req)
      req.path_info = "/index.html"
      @file_handler.serve(req)
    end

    def should_serve_react?(req)
      return false unless req.get?
      path = ::Rack::Utils.unescape_path(req.path_info)
      return false unless ::Rack::Utils.valid_path?(path)
      path = ::Rack::Utils.clean_path_info(path)
      return false if path.start_with?('/api')
      true
    end
  end
end
