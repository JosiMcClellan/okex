Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      get :ping, to: 'pongs#show'
      get 'hello_world', to: 'hello_world#hello_world'
      resources :communities, only: [:index, :show] do
        get :preview, on: :member
      end

    end
  end

  match 'api', anchor: false, via: :all, to: 'application#not_found'
  get 'hello_world', to: 'react#index'
  get '*path', to: 'react#index'
end
