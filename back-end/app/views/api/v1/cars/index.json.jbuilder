json.cars @cars do |car|
  json.id car.id
  json.plate_number car.plate_number
  json.model car.model
  json.year car.year
  json.created_at car.created_at
  json.updated_at car.updated_at

  json.maintenance_services car.maintenance_services do |service|
    json.id service.id
    json.description service.description
    json.status service.status
    json.date service.date
    json.created_at service.created_at
    json.updated_at service.updated_at
  end
end

json.meta do
  json.total_pages @cars.total_pages
  json.current_page @cars.current_page
  json.total_count @cars.total_count
end
