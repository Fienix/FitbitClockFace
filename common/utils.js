// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Converts pressure in millibars to altitude in feet
// https://en.wikipedia.org/wiki/Pressure_altitude
export function altitudeFromPressure(pressure) {
  return (1 - (pressure/1013.25)**0.190284)*145366.45;
}

export function convertEpochTime(x, clockType)
{
  let e = new Date(0);
  e.setUTCSeconds(x)
  let hours = e.getHours();
  let mins = zeroPad(e.getMinutes());
  let suffix = "a";
  
  if (clockType === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  }
  
  return hours + ":" + mins;
}

export function getWeatherIcon(condition)
{
  switch(condition) {
    case "clear-day":
      return "icons/Clear-Day.png"
      break;
    case "rain":
      return "icons/Rain.png"
      break;
    case "snow":
      return "icons/Snow.png"
      break;
    case "sleet":
      return "icons/Sleet.png"
      break;
    case "wind":
      return "icons/Wind.png"
      break;
    case "fog":
      return "icons/Fog.png"
      break;
    case "cloudy":
      return "icons/Cloudy.png"
      break;
    case "partly-cloudy-day":
      return "icons/Partly-Cloudy-Day.png"
      break;
    case "partly-cloudy-night":
      return "icons/Partly-Cloudy-Night.png"
      break;
    default:
      return "icons/Clear-Night.png"
  }
}

export function getCardinal(angle) {
        var directions = 8;
        var degree = 360 / directions;
        angle = angle + degree/2;
        
        if (angle >= 0 * degree && angle < 1 * degree)
            return "N";
        if (angle >= 1 * degree && angle < 2 * degree)
            return "NE";
        if (angle >= 2 * degree && angle < 3 * degree)
            return "E";
        if (angle >= 3 * degree && angle < 4 * degree)
            return "SE";
        if (angle >= 4 * degree && angle < 5 * degree)
            return "S";
        if (angle >= 5 * degree && angle < 6 * degree)
            return "SW";
        if (angle >= 6 * degree && angle < 7 * degree)
            return "W";
        if (angle >= 7 * degree && angle < 8 * degree)
            return "NW";
        //Should never happen: 
        return "N";
    }

export function formatDate(date) {
  let monthNum = date.getMonth();
  let day = date.getDate();
  let year = date.getYear() + 1900;
  let weekDayNum = date.getDay();
  
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";  
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  
  var weekDay = new Array();
  weekDay[0] = "Sun";
  weekDay[1] = "Mon";
  weekDay[2] = "Tue";
  weekDay[3] = "Wed";
  weekDay[4] = "Thu";
  weekDay[5] = "Fri";
  weekDay[6] = "Sat";
  
  let monthName = month[monthNum];
  let weekDayName = weekDay[weekDayNum]
  
  return weekDayName + " - " + monthName + " " + day + " - " + year;
}