  function check() {
    let city = document.getElementById("search").value;
    getWeather(city);
    getGoogleMap(city);
  }

  async function getWeather(city) {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b2fe86acda81f8761fcf8f70357d4ee&units=metric`
      );

      let data = await response.json();

      let responseData2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=5b2fe86acda81f8761fcf8f70357d4ee`
      );

      let arr = await responseData2.json();

      showWeather(data, city, arr);
      console.log(arr);
    } catch (err) {
      console.log(err);
    }
  }

  function getGoogleMap(city) {
    let getMapData = document.getElementById("googleMap");
    getMapData.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=AIzaSyAWrXe9tnjD0YutIzBzCoyfwO7tRb2s8Lg=&output=embed`;
    getMapData.width = "100%";
    getMapData.height = "660px";
    getMapData.style.border = "2px dashed blue";
  }

  function showWeather(weather, city, arr) {
    let result = document.getElementById("result");
    result.innerText = "";
    result.style.border = "2px dashed blue";

    if (weather.main == undefined) {
      let div = document.createElement("div");
      div.style.backgroundColor = "red";
      div.style.borderRadius = "10px";
      let img = document.createElement("img");
      img.src =
        "https://media4.giphy.com/media/QRhtqYeEywJI4/200.webp?cid=ecf05e473g0ez2ad8pseo5zua3s3z2xkrnd47biak1lsfg4t&rid=200.webp&ct=g";

      img.style.width = "100%";
      img.style.height = "500px";
      img.style.padding = "20px";

      div.append(img);
      result.style.backgroundColor = "red";
      result.style.padding = "20px";
      result.append(div);

      return;
    } else {
      result.style.backgroundColor = "rgb(245, 228, 245)";
      result.style.padding = "20px";

      let cityName = document.createElement("h1");
      cityName.innerText = city;
      cityName.className = "text-uppercase text-success bg-light fw-bold fs-1";

      let min = document.createElement("p");
      min.innerHTML = `<h4>Min-Temp : <span> ${weather.main.temp_min}°</span> </h4>`;

      let max = document.createElement("p");
      max.innerHTML = `<h4>Max-Temp : <span> ${weather.main.temp_max}°</span> </h4>`;

      let wind = document.createElement("p");
      wind.innerHTML = `<h4>Wind-Deg : <span> ${weather.wind.deg}°</span> </h4>`;

      let speed = document.createElement("p");
      speed.innerHTML = `<h4>Wind-Speed : <span>W ${weather.wind.speed} km/h</span> </h4>`;

      let gusts = document.createElement("p");
      gusts.innerHTML = `<h4>Wind-Gusts : <span>${weather.wind.gust} km/h</span> </h4>`;

      let clounds = document.createElement("p");
      clounds.innerHTML = `<h4>Clouds : <span> ${weather.clouds.all}%</span> </h4>`;

      let humidity = document.createElement("p");
      humidity.innerHTML = `<h4>Humidity : <span> ${weather.main.humidity}%</span> </h4>`;

      let pressure = document.createElement("p");
      pressure.innerHTML = `<h4>Pressure : <span> ${weather.main.pressure} km</span> </h4>`;

      let unix = weather.sys.sunrise;
      let date = new Date(unix * 1000);

      let unix2 = weather.sys.sunset;
      let date2 = new Date(unix2 * 1000);

      let sunrise = document.createElement("p");
      sunrise.innerHTML = `<h4>Sunrise : <span> ${date} </span> </h4>`;

      let sunset = document.createElement("p");
      sunset.innerHTML = `<h4>Sunset : <span> ${date2} </span> </h4>`;

      result.append(
        cityName,
        clounds,
        pressure,
        humidity,
        min,
        max,
        wind,
        gusts,
        speed,
        sunrise,
        sunset
      );
    }

    let tempMin = document.getElementsByClassName("tempMin");
    let tempMax = document.getElementsByClassName("tempMax");
    for (var j = 0; j < tempMin.length; j++) {
      tempMax[j].innerText = arr.list[j].main.temp_max;
      tempMin[j].innerText = arr.list[j].main.temp_min;
    }
  }