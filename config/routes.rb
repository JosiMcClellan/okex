Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      get :ping, to: 'pongs#show'

      resource :account, only: :create
      resources :communities, only: [:index, :show], param: :slug
      scope path: 'communities/:slug' do
        resource :profile, only: [:show, :create]
        resources :discussions, only: [:index, :show, :create] do
          resources :posts, only: :create
        end
        resources :profile_fields, only: :update
        resources :questions, only: [:index, :update]
      end

    end
  end

  match '/api', anchor: false, via: :all, to: 'application#no_route'
end
