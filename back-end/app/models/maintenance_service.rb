class MaintenanceService < ApplicationRecord
  belongs_to :car

  enum status: { pending: 0, in_progress: 1, completed: 2 }

  validates :description, presence: true
  validates :date, presence: true
  validate :date_cant_be_in_the_future

  private

  def date_cant_be_in_the_future
    if date.present? && date > Date.today
      errors.add(:date, "can't be in the future")
    end
  end
end
