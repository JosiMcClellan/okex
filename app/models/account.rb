class Account < ApplicationRecord

  has_many :profiles

  enum role: ['default', 'admin']

  validates_presence_of(
    :google_sub,
    :email,
    :email_verified,
    :token
  )

end
