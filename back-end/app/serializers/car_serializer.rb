class CarSerializer < ActiveModel::Serializer
  attributes :id, :plate_number, :model, :year, :created_at, :updated_at

  has_many :maintenance_services, serializer: MaintenanceServiceSerializer
end
