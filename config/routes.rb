Rails.application.routes.draw do
  scope path: :api do
    scope path: :v1 do
      get 'hello_world', to: 'hello_world#hello_world'
    end
  end
end
