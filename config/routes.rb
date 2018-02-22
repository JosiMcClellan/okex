Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      get :ping, to: 'pongs#show'
      get 'hello_world', to: 'hello_world#hello_world'
      resources :communities, only: :index

    end
  end
end
