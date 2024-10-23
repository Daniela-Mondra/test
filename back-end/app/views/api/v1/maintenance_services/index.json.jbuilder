json.maintenance_services do
  json.array! @maintenance_services do |service|
    json.id service.id
    json.description service.description
    json.status service.status
    json.date service.date

    json.car do
      json.id service.car.id
      json.plate_number service.car.plate_number
      json.model service.car.model
      json.year service.car.year
    end
  end

end

json.meta do
  json.current_page @maintenance_services.current_page
  json.total_pages @maintenance_services.total_pages
  json.total_count @maintenance_services.total_count
end
