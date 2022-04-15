let Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let now = new Date();

let h3Day = document.querySelector("h3.Day");
let h3Date = document.querySelector("h3.Date");
let h3Time = document.querySelector("h3.Time");

h3Day.innerHTML = Days[now.getDay()];
h3Date.innerHTML = `${now.getDate()} ${
  Months[now.getMonth()]
} , ${now.getFullYear()}`;
if (now.getMinutes() < 10) {
  h3Time.innerHTML = `${now.getHours()}:0${now.getMinutes()}`;
} else {
  h3Time.innerHTML = `${now.getHours()}:${now.getMinutes()}`;
}

function displayTemp(response) {
  let UpdateMain = document.querySelector(".mainTemp");
  let Maxtemp = document.querySelector(".maxTemp");
  let MinTemp = document.querySelector(".minTemp");
  let Humid = document.querySelector(".humidity");
  let windS = document.querySelector(".wind");
  let Temp = Math.round(response.data.main.temp);
  let desc = document.querySelector(".weat");

  UpdateMain.innerHTML = `${Temp}`;
  Maxtemp.innerHTML = `${Math.round(response.data.main.temp_max)}`;
  MinTemp.innerHTML = `${Math.round(response.data.main.temp_min)}`;
  Humid.innerHTML = `${Math.round(response.data.main.humidity)} %`;
  windS.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  desc.innerHTML = `${response.data.weather[0].description.toUpperCase()}`;
}

function update(event) {
  event.preventDefault();
  let input = document.querySelector(".searchBar");
  let updateCity = document.querySelector(".h1city");
  let city = input.value;
  updateCity.innerHTML = city.toUpperCase();
  let apiKey = "8fd4039279da65cd9545bf64af9960b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", update);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let updateCity = document.querySelector(".h1city");
  updateCity.innerHTML = `Current Location`;
  let apiKey = "8fd4039279da65cd9545bf64af9960b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function getcurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonC = document.querySelector("button.Current");
buttonC.addEventListener("click", getcurrentLocation);
