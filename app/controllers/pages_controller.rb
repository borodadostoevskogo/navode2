class PagesController < ActionController::Base
  layout 'application'
  
  def home
    respond_to do |format|
      format.html
    end
  end
end
