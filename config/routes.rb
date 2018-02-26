Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      resources :communities, only: [:index, :show], param: :c_slug
      scope path: 'communities/:c_slug' do
        resource :profile, only: [:show, :create]
      end
      resource :account, only: :create

      get 'hello_world', to: 'hello_world#hello_world'
      get :ping, to: 'pongs#show'

    end
  end

  match 'api', anchor: false, via: :all, to: 'application#bad_request'
  get 'hello_world', to: 'react#index'
  get '*path', to: 'react#index'
end
