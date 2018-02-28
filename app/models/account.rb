class Account < ApplicationRecord

  has_many :profiles
  # has_one suspension
  # has_many flags, through: :profiles
  validates_presence_of(
    :uid,
    :email,
    :email_verified,
    # :refresh,
    # :good_until
    :token
  )

  enum role: ['default', 'admin']

end
