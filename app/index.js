import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";
import * as messaging from "messaging";
import { Barometer } from "barometer";

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const time = document.getElementById("time");
const sec = document.getElementById("sec");
const ampm = document.getElementById("ampm");
const date = document.getElementById("date");
const hr = document.getElementById("hr");
const steps = document.getElementById("steps");
const cal = document.getElementById("cal");
const marquee = document.getElementById("marquee");
const loc = document.getElementById("loc");
const alt = document.getElementById("alt");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");

// Update UI on each clock tick
clock.ontick = (evt) => {
  // Get current datetime
  let now = evt.date;
  let hours = now.getHours();
  let mins = util.zeroPad(now.getMinutes());
  let secs = util.zeroPad(now.getSeconds());
  
  // Format time
  if (hours > 11) { ampm.text = "pm"; }
  else { ampm.text ="am"; }

  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  }
  
  // Zero pad hours
  hours = util.zeroPad(hours);
  
  // Set time
  time.text = `${hours}:${mins}`;  
  sec.text = `${secs}`;
  
  // Set date
  date.text = util.formatDate(now);
  
  // Get steps
  steps.text = today.local.steps;
}

// Get heart rate
let hrm = new HeartRateSensor();
// Set heart rate
hrm.onreading = function() {
  hr.text = hrm.heartRate;
}
// Start heart rate monitor
hrm.start();
  
// Create a new instance of the Barometer
var bar = new Barometer();
// Update the lavel with each reading from the sensor
bar.onreading = () => {
  alt.text = Math.round(util.altitudeFromPressure(bar.pressure / 100)) + " ft";
}
// Begin monitoring the sensor
bar.start();

// Marquee settings
setTimeout(function() {
  marquee.state = "enabled";
}, 2000);

// Update UI when data is received from Companion
messaging.peerSocket.onmessage = evt => {
  console.log(evt.data.command + ": " + JSON.stringify(evt.data.content))
  if (evt.data)
  {
    if (evt.data.command == "weather")
    {
      weather.href = util.getWeatherIcon(evt.data.content.condition);
      temp.text = evt.data.content.temp;
      //wind.text = evt.data.content.wind;
      //humidity.text = (evt.data.content.humidity * 100) + "%";
      marquee.text = evt.data.content.summary;
    }

    if (evt.data.command == "location")
    {
      loc.text = evt.data.content.location;
    }

    // Get calories remaining in daily budget
    if (evt.data.command == "calories")
    {
      let caloriesLeft = (evt.data.content.caloriesGoal - evt.data.content.caloriesIn);
      cal.text = caloriesLeft;
      if (caloriesLeft > 200) { cal.style.fill = "#009FB7"; }
      if (caloriesLeft <= 200 && caloriesLeft >= 0) { cal.style.fill = "#FED766"; }
      if (caloriesLeft < 0) { cal.style.fill = "#FE4A49"; }
    }
  }
}