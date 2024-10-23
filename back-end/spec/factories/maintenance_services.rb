FactoryBot.define do
  factory :maintenance_service do
    association :car
    description { "Cambio de aceite" }
    status { 0 }
    date { Date.today }           
  end
end
