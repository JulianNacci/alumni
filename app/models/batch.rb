# == Schema Information
#
# Table name: batches
#
#  id         :integer          not null, primary key
#  slug       :string
#  city_id    :integer
#  starts_at  :date
#  ends_at    :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  onboarding :boolean          default(FALSE), not null
#
# Indexes
#
#  index_batches_on_city_id  (city_id)
#

class Batch < ActiveRecord::Base
  validates :slug, presence: true, uniqueness: true
  validates :city, presence: true
  validates :starts_at, presence: true

  belongs_to :city
  has_many :users
  has_many :projects

  before_validation :set_ends_at

  def set_ends_at
    self.ends_at = self.starts_at + 9.weeks - 3.days if self.starts_at
  end
end
