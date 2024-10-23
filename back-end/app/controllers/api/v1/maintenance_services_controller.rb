class Api::V1::MaintenanceServicesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @maintenance_services = MaintenanceService.page(params[:page]).per(10)
    render :index
  end

  def show
    service = MaintenanceService.find(params[:id])
    render json: service
  end

  def create
    service = MaintenanceService.new(service_params)
    if service.save
      render json: service, status: :created
    else
      render json: service.errors, status: :unprocessable_entity
    end
  end

  def update
    service = MaintenanceService.find(params[:id])
    if service.update(service_params)
      render json: service
    else
      render json: service.errors, status: :unprocessable_entity
    end
  end

  def destroy
    service = MaintenanceService.find(params[:id])
    service.destroy
    head :no_content
  end

  private

  def pagination_meta(services)
    {
      total_pages: services.total_pages,
      current_page: services.current_page,
      total_count: services.total_count
    }
  end

  def service_params
    params.require(:maintenance_service).permit(:description, :status, :date, :car_id)
  end
end
