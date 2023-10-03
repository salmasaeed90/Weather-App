//All elements
let today = document.querySelector(".today");
//location name
let locationName = document.querySelector(".location");
//temptrtuer degree
let tempDegree = document.querySelector(".temp-deg");
//weather icon img
let weatherImg = document.querySelector(".weather-icon");
//weather-case
let weatherCase = document.querySelector(".weather-case");
//items-cases
let itemCase_1 = document.querySelector(".item-case1");
let itemCase_2 = document.querySelector(".item-case2");
let itemCase_3 = document.querySelector(".item-case3");
//tomorrow section
/////////////////////////////////////
let tomorrow = document.querySelector(".tomorrow");
//img
let tomorrow_icon = document.querySelector(".tomorrow-icon");
//high temp
let major_temp = document.querySelector(".major_temp");
//micro temp
let micro_temp = document.querySelector(".micro_temp");
//WeatherCase
let tomorrowWeatherCase = document.querySelector(".tomorrow-weather-case");
//after tomorrow section
//////////////////////////////////////////
let afterTomorrow = document.querySelector(".after-tomorrow");
//img
let after_tomorrow_icon = document.querySelector(".after-tomorrow-icon");
//high temp
let major_temp2 = document.querySelector(".major_temp2");
//micro temp
let micro_temp2 = document.querySelector(".micro_temp2");
//WeatherCase
let afterTomorrowWeatherCase = document.querySelector(
  ".after-tomorrow-weather-case"
);
//date elements
let first_day_name = document.querySelector(".first-day");
let second_day_name = document.querySelector(".second-day");
let third_day_name = document.querySelector(".third-day");

let day_number = document.querySelector(".day-number");
let month_name = document.querySelector(".date");
let search = document.getElementById("search");

//location code

// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     console.log(position);
//   },
//   function () {
//     alert("we didnt have permission.");
//   }
// );

// async function getUserPosition(position) {
//   console.log(position);
//   const lat = position.coords.latitude;
//   const long = position.coords.longitude;
//   console.log(lat, long);
//   let response = await fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
//     // https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837&localityLanguage=en
//   );
//   let userLocationData = await response.json();
//   console.log(userLocationData);
//   return userLocationData.city;
// }

// async function getUserData(city) {
//   let response = await fetch(
//     `https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${city}&days=3`
//   );
//   let data = await response.json();
//   // console.log(data);
//   return data;
// }
//get data from api
async function getData(townName) {
  //townName
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${townName}&days=3`
  ); //${townName}
  let data = await response.json();
  // console.log(data);
  return data;
}

// display today data
function showTodayData(data) {
  //date
  let date = new Date();
  first_day_name.innerHTML = date.toLocaleDateString("en-us", {
    weekday: "long",
  });
  day_number.innerHTML = date.getDate();

  month_name.innerHTML = date.toLocaleDateString("en-us", {
    month: "long",
  });
  locationName.innerHTML = data.location.name;
  tempDegree.innerHTML = data.current.temp_c;
  weatherImg.setAttribute("src", data.current.condition.icon);
  weatherCase.innerHTML = data.current.condition.text;
  itemCase_1.innerHTML = data.current.humidity + "%";
  itemCase_2.innerHTML = data.current.wind_kph + "km/h";
  itemCase_3.innerHTML = data.current.wind_dir;
}
//display next days data

function showNextDayData(data) {
  //array have data for 3 days
  let daysData = data.forecast.forecastday;
  // console.log(daysData.day);
  for (let i = 0; i < daysData.length; i++) {
    // //date
    let date2 = new Date(daysData[i + 1].date);
    second_day_name.innerHTML = date2.toLocaleDateString("en-us", {
      weekday: "long",
    });
    let date3 = new Date(daysData[i].date);
    third_day_name.innerHTML = date3.toLocaleDateString("en-us", {
      weekday: "long",
    });
    // console.log(daysData[i + 2].date);
    //tomorrow data
    tomorrow_icon.setAttribute("src", daysData[i + 1].day.condition.icon);
    major_temp.innerHTML = daysData[i + 1].day.maxtemp_c;
    micro_temp.innerHTML = daysData[i + 1].day.mintemp_c;
    tomorrowWeatherCase.innerHTML = daysData[i + 1].day.condition.text;
    //After tomorrow data
    after_tomorrow_icon.setAttribute("src", daysData[i + 2].day.condition.icon);
    major_temp2.innerHTML = daysData[i + 2].day.maxtemp_c;
    micro_temp2.innerHTML = daysData[i + 2].day.mintemp_c;
    afterTomorrowWeatherCase.innerHTML = daysData[i + 2].day.condition.text;
  }
}
//start app

async function allDayes(town = "cairo") {
  //town ='cairo'
  let weatherData = await getData(town); //town
  if (!weatherData.error) {
    showTodayData(weatherData);
    showNextDayData(weatherData);
  }
}
allDayes();

search.addEventListener("keyup", function () {
  allDayes(search.value);
});

//functiopn=>
//1/ default data * if i dont allwed my location
//** if i allwed my location => my city
//***  search data

// (function defaultData() {
//   switch(expression) {
//   case (!position):
//      allDayes("cairo");
//     break;
//   case (position):
//     allDayes(position);
//     break;
//   default:
//     allDayes("cairo");
// }
// })();
