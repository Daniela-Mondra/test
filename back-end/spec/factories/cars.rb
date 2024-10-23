FactoryBot.define do
  factory :car do
    sequence(:plate_number) { |n| "ABC#{n}" } 
    model { "Model X" }
    year { 2020 }
  end
end
