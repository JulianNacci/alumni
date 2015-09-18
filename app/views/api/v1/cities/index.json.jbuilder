json.cities do
  json.array! @cities do |city|
    json.extract! city, :id, :name, :location
    json.description do
      json.fr city.description_fr
      json.en city.description_en
    end
    json.extract! city, :address, :latitude, :longitude
    json.location_picture city.location_picture.url(:big)
    json.city_picture city.city_picture.url(:big)
    json.extract! city, :meetup_id, :twitter_url
  end
end
