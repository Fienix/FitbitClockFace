import * as msg from "./msg";
import * as loc from "./location";
import * as util from "../common/utils";
import { geolocation } from "geolocation";
import * as key from "../settings/keys";

const weatherApiKey = key.weatherApi();

export function fetchWeatherData() {
  geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
  
    fetch(`https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}?exclude=minutely,hourly,alerts,flags`, {
      method: "GET"
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {    
      let myData = {
        temp: Math.round(data.currently.temperature) + "°",
        condition: data.currently.icon,
        //wind: Math.round(data.currently.windSpeed) + " " + util.getCardinal(data.currently.windBearing),
        //humidity: data.currently.humidity,
        summary: data.daily.data[0].summary
      }
      msg.sendMessage("weather", myData);
    })
    .catch(err => console.log('[FETCH]: ' + err));
  });
}