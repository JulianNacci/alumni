Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root 'posts#index'

  # API routing
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :cities,       only: [ :index, :show ]
      resources :batches,      only: [ :show ] do
        collection do
          get "live"
        end
      end
      resources :projects,     only: [ :index ]
      resources :alumni,       only: [ :index ]
      resources :staff,        only: [ :index ]
      resources :stories,      only: [ :index, :show ]
      resources :testimonials, only: [ :index ]
      resources :users,        only: [] do
        put :picture, on: :collection
      end
    end
  end

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  resources :posts, only: %i(index) do
    member do
      post :up_vote
    end
    collection do
      get :next
      post :search
    end
  end

  resources :answers, only: [:create, :update] do
    collection do
      post :preview
      get :language
    end
  end

  resources :batches, only: %i(show edit update) do
    member do
      get :register
    end
  end

  get :onboarding, to: 'batches#onboarding'

  resources :questions, only: %i(new show create update) do
    member do
      patch :solve
    end
  end
  resources :milestones, only: %i(new show create update)
  resources :jobs, only: %i(new show create update)
  resources :projects, only: %i(show)
  resources :resources, only: %i(new create show) do
    collection do
      post :preview
    end
  end
  resources :cities, only: %i(index show) do
    resources :batches, only: %i(new create)
  end

  resources :users, only: %i(index update) do
    member do
      post :confirm
      post :delete
    end
  end

  require "sidekiq/web"
  authenticate :user, lambda { |u| u.admin } do
    mount Sidekiq::Web => '/sidekiq'
  end

  # Keep this route at the bottom.
  get '/:github_nickname', to: 'users#show', as: :profile
end
