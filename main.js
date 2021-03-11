const Container = new Vue({
  el: "#container",
  data: {
    header: "VUE-JS",
    country: "Country",
    city,
    legend: "CuRRWeaTHer",
  },
  methods: {},
});
const country_ = new Vue({
  el: "#country_",
  data: {
    title: "Country",
  },
  methods: {
    alert: () => {
      alert();
    },
  },
});
const city_ = new Vue({
  el: "#city_",
  data: {
    title: "City",
  },
  methods: {
    alert: () => {
      alert();
    },
  },
});
const search_ = new Vue({
  el: "#search_",
  data: {
    title: "Search",
  },
  methods: {
    getWeather: (e) => {
      e.preventDefault();
      getGif();
    },
  },
});
const viewAllDetails = new Vue({
  el: "#view-details",
  data: {
    seen: true,
  },
  methods: {
    show: () => {
      return !true;
    },
    weather: () => {
      appendData.html();
      const html = ``;
    },
  },
});

const countryName = document.querySelector(".countryname");
const description = document.querySelector(".description");
const temp = document.querySelector(".temp");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const speed = document.querySelector(".speed");
const deg = document.querySelector(".deg");
const img = document.querySelector("img");
// search.addEventListener("click", function (e) {
//   e.preventDefault();
//   getGif();
// });
async function getGif() {
  const weather = await getCountryWeather();
  const gifURL = `https://api.giphy.com/v1/gifs/translate?api_key=lqK0zQE4DNeoht6DkbPI7pOq1oP8us8S&s=${weather}`;
  const data = await fetch(gifURL);
  const res = await data.json();
  const gif = res.data.images.downsized_medium.url;
  appendData.weather();
  return appendData.gif(gif);
}

function checkWeather() {
  let weatherURL;
  let con = country.value;
  let cit = city.value;
  let x = con.slice(0, 1).toUpperCase() + con.substr(1);
  if (con === "") {
    return;
  } else if (cit === "") {
    weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${x}&APPID=18c71bd9206ecf208842e382fc0c73bf`;
  } else if (cit !== "") {
    weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${x},${cit}&APPID=18c71bd9206ecf208842e382fc0c73bf`;
  }
  return weatherURL;
}
async function getCountryWeather() {
  const weatherURL = checkWeather();
  const get = await fetch(weatherURL);
  const response = await get.json();
  const main = response.weather[0].main;
  return main;
}
const appendData = {
  gif(image) {
    img.setAttribute("src", image);
  },
  async weather() {
    const weatherURL = checkWeather();
    try {
      const get = await fetch(weatherURL);
      const response = await get.json();
      const main = response;
      countryName.innerText = main.name;
      description.innerText = main.weather[0].description;
      temp.innerText = main.main.temp;
      humidity.innerText = main.main.humidity;
      pressure.innerText = main.main.pressure;
      speed.innerText = main.wind.speed;
      deg.innerText = main.wind.deg;
      console.log(main);
      return { main };
    } catch (err) {
      console.log(err);
    }
  },
  async html() {
    const weatherURL = checkWeather();
    try {
      const data = await fetch(weatherURL);
      const res = await data.json();
      const obj = res;
      const base_ = new Vue({
        el: "#base_",
        data: {
          title: "Stations",
        },
      });
      const clouds_ = new Vue({
        el: "#clouds_",
        data: {
          title: "Clouds",
          info: res.clouds.all,
        },
      });
      const main_ = new Vue({
        el: "#clouds_",
        data: {
          title: "Feels Like",
          info: res.main,
        },
      });
      const coords_ = new Vue({
        el: "#clouds_",
        data: {
          title: "Clouds",
          desc: ["longitude", "latitude"],
          info: res.coord,
          wind : res.wind
        },
      });
      return {base_,coords_,main_}
    } catch (err) {
      console.log(err);
    }
  },
};
// appendData.html()
