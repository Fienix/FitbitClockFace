import * as msg from "./msg";
import { geolocation } from "geolocation";
import * as key from "../settings/keys";

const locationApiKey = key.locationApi();

export function fetchLocationData() {
  geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
  
    // Get city
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${locationApiKey}`, {
      method: "GET"
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
        for (var ac = 0; ac < data.results[0].address_components.length; ac++) {

           var component = data.results[0].address_components[ac];
           if(component.types.includes('sublocality') || component.types.includes('locality')) {
             let data = {
                location: component.short_name
             }
              msg.sendMessage("location", data);
           }
        };
    })
    .catch(err => console.log('[FETCH]: ' + err));
  });
}
