class AccountSerializer < ApplicationSerializer
  attributes :id, :email, :token

  # has_many :profiles
end
