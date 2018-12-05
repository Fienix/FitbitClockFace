import * as msg from "./msg";

// Fetch Calorie Data from Fitbit Web API
export function fetchCaloriesData(accessToken)  {
  let date = new Date();
  let todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; //YYYY-MM-DD

  fetch(`https://api.fitbit.com/1.2/user/-/foods/log/date/${todayDate}.json`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Access-Control-Allow-Origin": `*`,
      "Access-Control-Allow-Credentials": `true`
    }
  })
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    let myData = {
      caloriesIn: (data.summary.calories || 0),
      caloriesGoal: (data.goals.calories || 0)
    }
    msg.sendMessage("calories", myData);
  })
  .catch(err => console.log('[FETCH]: ' + err));
}