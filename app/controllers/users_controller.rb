class UsersController < ActionController::Base
  include Devise::Controllers::Helpers
  skip_before_action :verify_authenticity_token

  def signin

    @user = User.find_by_email(params[:email])
    @status = ''
    if @user.valid_password?(params[:password].to_s)
      @status = 'allgood'
      sign_in(@user)
    else 
      @status = 'nope'
    end

    respond_to do |format| 
      format.js {render layout: false}
    end

  end




  def register

    if params[:email] != '' and params[:password] != '' and params[:password_confirm] != '' and params[:phone] != ''
        @candidate = UserCandidate.new
        @candidate.password = params[:password]
        @candidate.email = params[:email]
        @candidate.phone = params[:phone]
        @candidate.save

        @token = Token.new
        @token.user_candidate = @candidate
        @token.token = rand(10 ** 4)
        @token.save

        puts 'candidate created, token:'
        puts @token.token

        @status = 'ok'
        puts @status
    end
      
    respond_to do |format| 
      format.js {render layout: false}
    end
      
    
  end

  def approve
    @candidate = UserCandidate.where(phone: params[:phone]).last
    @token = @candidate.tokens.last

    @message = ''
    @status = ''
    if !@candidate.nil?
      if @token.token.to_s == params[:token].to_s
        puts 'Токены совпали'
        @user = User.create({email: @candidate.email,password: @candidate.password, phone: @candidate.phone})
        sign_in(@user)
        @message = 'Пользователь успешно создан. Вход выполнен.'
        @status = 'allgood'
      else
        @message = 'Введён неправильный код.'
        @status = 'wrongcode'
      end
    else
      @message = 'Пользователь с таким номером не найден. Странно!'
      @status = 'nouser'
    end
  end

  puts @message

  def signout
    sign_out(User.find(current_user['id']))
    respond_to do |format| 
      format.js {render layout: false}
    end
  end

end
