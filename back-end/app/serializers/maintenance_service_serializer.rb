class MaintenanceServiceSerializer < ActiveModel::Serializer
  attributes :id, :description, :status, :date

  belongs_to :car
end
