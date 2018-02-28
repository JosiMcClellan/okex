class AccountSerializer < ActiveModel::Serializer
  attributes :id, :email, :token

  # has_many :profiles
end
