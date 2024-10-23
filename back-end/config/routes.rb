Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :cars, defaults: { format: :json }
      resources :maintenance_services, defaults: { format: :json }
    end
  end
end
