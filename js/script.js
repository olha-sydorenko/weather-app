let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

let currentDay = document.querySelector("#day");
currentDay.innerHTML = day;

let months = [
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
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
if (date === 1 || date === 21 || date === 31) {
  date = `${date}st`;
} else {
  if (date === 2 || date === 22) {
    date = `${date}nd`;
  } else {
    if (date === 3 || date === 23) {
      date = `${date}rd`;
    } else {
      date = `${date}th`;
    }
  }
}
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${month}, ${date}`;

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentHour = document.querySelector("#hour");
currentHour.innerHTML = `${hour}:${minutes}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${temperature}`;
  let temp_feels = Math.round(response.data.main.feels_like);
  let feels = document.querySelector("#feels");
  feels.innerHTML = `${temp_feels}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  let wind_speed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${wind_speed}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h2 = document.querySelector("h2");
  let city = searchInput.value;
  if (searchInput.value) {
    h2.innerHTML = searchInput.value;
    searchInput.value = "";
  } else {
    alert("Please, type a city");
  }
  let apiKey = "3cfbe117a0a2b535314cc626699c0963";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

function currentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${temperature}`;
  let temp_feels = Math.round(response.data.main.feels_like);
  let feels = document.querySelector("#feels");
  feels.innerHTML = `${temp_feels}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  let wind_speed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${wind_speed}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  console.log(response);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3cfbe117a0a2b535314cc626699c0963";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);

function convertFahr(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = "66";
}
let fahrLink = document.querySelector("#fahrenheit");
fahrLink.addEventListener("click", convertFahr);

function convertCels(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = "17";
}
let celsLink = document.querySelector("#celsius");
celsLink.addEventListener("click", convertCels);
