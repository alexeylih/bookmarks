class HomeController < ApplicationController
  respond_to :html
  layout "angular"

  def index
  		logger.debug current_user
  end
end
