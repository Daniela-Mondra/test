class Api::V1::CarsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @cars = Car.includes(:maintenance_services).page(params[:page]).per(10)
    render :index
  end

  def show
    car = Car.find(params[:id])
    render json: car
  end

  def create
    car = Car.new(car_params)
    if car.save
      render json: car, status: :created
    else
      render json: car.errors, status: :unprocessable_entity
    end
  end

  def update
    car = Car.find(params[:id])
    if car.update(car_params)
      render json: car
    else
      render json: car.errors, status: :unprocessable_entity
    end
  end

  def destroy
    car = Car.find(params[:id])
    car.destroy
    head :no_content
  end

  private

  def pagination_meta(cars)
    {
      total_pages: cars.total_pages,
      current_page: cars.current_page,
      total_count: cars.total_count
    }
  end

  def car_params
    params.require(:car).permit(:plate_number, :model, :year)
  end
end
