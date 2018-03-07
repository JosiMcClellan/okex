Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      get :ping, to: 'pongs#show'
      get 'hello_world', to: 'hello_world#hello_world'

      resource :account, only: :create
      resources :communities, only: [:index, :show], param: :slug
      scope path: 'communities/:slug' do
        resource :profile, only: [:show, :create]
        resources :discussions, only: [:index, :show, :create] do
          resources :posts, only: :create
        end
      end

    end
  end

  match '/api', anchor: false, via: :all, to: 'application#no_route'
end
