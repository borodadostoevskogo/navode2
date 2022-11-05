Rails.application.routes.draw do

  devise_for :users
  root to: "pages#home"

  get '/single', to: 'pages#single'


  post '/signin', to: 'users#signin'
  post '/signout', to: 'users#signout'
  post '/register', to: 'users#register'
  post '/approve', to: 'users#approve'


end
