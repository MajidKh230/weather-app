let search = document.getElementById("city");
let API_KEY = 'def4efb6af1fb6807d5e004987ce4fc6'
function handleSearch() {
  console.log(search.value);
  if(search.value.trim()=== ""){
    box.innerHTML = `
    <p class="error">Please Input a City Name</p>
`;
  }
  else{
    callAPI(search);
    search.value = '';
  }
}

search.addEventListener('keyup',(e)=>{
  if(e.key === 'Enter'){
    handleSearch();
  }
})
let box = document.querySelector(".weather");
let body = document.querySelector("body");
function showData(data){
  const { country } = data.sys;
  const { temp,humidity } = data.main;
  const {speed} = data.wind;
  let {main,id} = data.weather[0]
  let updateTemp = Math.floor(temp)
console.log(id)
   if (id >= 200 && id <= 232) {
        urlImg = './images/scattered-thunderstorms.png';
        body.className = ' bg thunderstorms';
    } else if (id >= 300 && id <= 321) {
        urlImg = './images/drizzle.png';
        body.className = ' bg drizzle';
    } else if (id >= 500 && id <= 531) {
        urlImg = './images/rain.png';
        body.className = ' bg rain';
    } else if (id >= 600 && id <= 622) {
        urlImg = './images/snow.png';
        body.className = ' bg snow';
    } else if (id >= 701 && id <= 781) {
        urlImg = './images/cloudy.png';
        body.className = ' bg atmosphere';
    } else if (id >= 801 && id <= 804) {
        urlImg = './images/clouds.png';
        body.className = ' bg clouds';
    } else {
        urlImg = './images/sun.png';
        body.className = ' bg sun';
    }

  
   box.innerHTML = `
   <img src="${urlImg}" alt="weather icon" class="weather-icon">
        <p>${main}</p>
        <h1 class="temp">${updateTemp}°C</h1>
        <h2 class="city">${data.name},${country}</h2>
        <div class="details">
          <div class="col">
            <img src="images/humidity.png" alt="humidity icon">
            <div>
              <p class="humidity">${humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div class="col">
            <img src="images/wind.png" alt="wind icon">
            <div>
              <p class="wind">${speed} KM/H</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
        `
}

function callAPI(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      showData(data);
    })
    .catch((error) => {
      console.log(error);
    });
}




let currentLoc = document.getElementById('location');


function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
      (position) => {
          let lon = position.coords.longitude;
          let lat = position.coords.latitude;
          let Currenturl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
          fetch(Currenturl)
              .then((res) => res.json())
              .then((data) => showData(data))
              .catch((err) => {
                  box.innerHTML = `<img src="/images/not-found.png"/>`;
                  console.log(err);
              });
      },
      (error) => {
          const { message } = error;
          box.innerHTML = `<p class="error">${message}</p>`;
      }
  );
}

currentLoc.addEventListener('click', getCurrentLocation);
