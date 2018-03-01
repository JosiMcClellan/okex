class ApplicationSerializer < ActiveModel::Serializer
  def formatted_time(key)
    object[key].in_time_zone.strftime('%b %e, %Y')
  end
end
