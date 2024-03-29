class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  before_action :authenticate_user!, unless: :pages_controller?

  include Pundit
  after_action :verify_authorized, except:  [:index], unless: :devise_or_pages_or_admin_controller?
  after_action :verify_policy_scoped, only: :index, unless: :devise_or_pages_or_admin_controller?
  # rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def devise_or_pages_or_admin_controller?
    devise_controller? || pages_controller? || (self.kind_of? RailsAdmin::ApplicationController)
  end

  def pages_controller?
    controller_name == "pages"  # Brought by the `high_voltage` gem
  end

  def user_not_authorized
    flash[:error] = I18n.t('controllers.application.user_not_authorized', default: "You can't access this page.")
    redirect_to(root_path)
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end
