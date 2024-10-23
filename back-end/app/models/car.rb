class Car < ApplicationRecord
  has_many :maintenance_services, dependent: :destroy

  validates :plate_number, presence: true, uniqueness: true
  validates :year, numericality: { greater_than_or_equal_to: 1900, less_than_or_equal_to: Date.today.year }
end
