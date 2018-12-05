import * as messaging from "messaging";
import { settingsStorage } from "settings";
import * as weather from "./weather";
import * as cal from "./calories";
import * as loc from "./location";
import { me } from "companion"

const MILLISECONDS_PER_MINUTE = 1000 * 60

// Wake the Companion after 5 minutes
me.wakeInterval = 5 * MILLISECONDS_PER_MINUTE

// Monitor for significant changes in physical location
me.monitorSignificantLocationChanges = true

if (me.launchReasons.locationChanged || me.launchReasons.peerAppLaunched || me.launchReasons.wokenUp)
{
  restoreSettings();
}

// On socket open, restore settings and send message to device
messaging.peerSocket.onopen = () => {
  console.log("Ready");
  restoreSettings();
}

// Log peer socket errors
messaging.peerSocket.onerror = (err) => {
  console.log(`Connection error: ${err.code} - ${err.message}`);
}

// Output message data to console
messaging.peerSocket.onmessage = (evt) => {
  console.log(JSON.stringify(evt.data));
}

// A user changes Settings
settingsStorage.onchange = evt => {
  if (evt.key === "oauth") {
    // Settings page sent us an oAuth token
    let data = JSON.parse(evt.newValue);
    updateData(data.access_token)
  }
};

// Restore previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key && key === "oauth") {
      // We already have an oauth token
      let data = JSON.parse(settingsStorage.getItem(key))
      updateData(data.access_token)      
    }
  }
}

function updateData(token) {
  // Get calorie data
  cal.fetchCaloriesData(token);

  // Get weather data
  weather.fetchWeatherData();
  
  // Get location data
  loc.fetchLocationData();
}

