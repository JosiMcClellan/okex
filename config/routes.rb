Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      resource :account, only: :create
      resources :communities, only: [:index, :show], param: :slug
      scope path: 'communities/:slug' do
        resource :profile, only: [:show, :create]
        resources :discussions, only: [:index, :show]
      end

      get 'hello_world', to: 'hello_world#hello_world'
      get :ping, to: 'pongs#show'

    end
  end

  match 'api', anchor: false, via: :all, to: 'application#bad_request'
  get 'hello_world', to: 'react#index'
  get '*path', to: 'react#index'
end
