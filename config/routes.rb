Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

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

    get :ping, to: 'pongs#show'
    match '/', anchor: false, via: :all, to: 'no_route#show'
  end
end
