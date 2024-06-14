const apiKey = '1693c13db95a0c2b55b2ed680a6b20a6';
const mainCityCard = document.querySelector('.main-city');
const sunrise = document.querySelector('.sunrise-section')

function convertToLocalTime(unixTimestamp, timeZoneOffset) {
    const localTime = new Date((unixTimestamp + timeZoneOffset) * 1000);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    };
    return new Intl.DateTimeFormat('ru-RU', options).format(localTime);
}

export default function getWeather(cityname, code) {
    function updateWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname},${code}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const timezoneOffset = data.city.timezone; 
                const forecastList = data.list.slice(0, 5);
                console.log(forecastList)

                const forecastTimes = mainCityCard.querySelectorAll('.forecast-time');
                forecastTimes.forEach((elm, index) => {
                    const forecastTime = convertToLocalTime(forecastList[index].dt, timezoneOffset);
                    elm.textContent = forecastTime;
                });

                const forecastIcon = mainCityCard.querySelectorAll('.forecast-icon');
                forecastIcon.forEach((elm, index) => {
                    elm.innerHTML = `<img src="http://openweathermap.org/img/wn/${forecastList[index].weather[0].icon}.png" alt="Weather Icon">`;
                });

                const forecastTemp = mainCityCard.querySelectorAll('.forecast-temp');
                forecastTemp.forEach((elm, index) => {
                    elm.innerHTML = `${Math.round(forecastList[index].main.temp)}&deg;C`;
                });
            })
            .catch(error => {
                console.error('Error fetching forecast data:', error);
            });

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname},${code}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const currentWeather = data;
                console.log(currentWeather)

                mainCityCard.querySelector('h1').textContent = `${currentWeather.name}, ${code}`;
                mainCityCard.querySelector('p').innerHTML = `${Math.round(currentWeather.main.temp)}&deg;C, ${currentWeather.weather[0].description}<br><br><img src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png" alt="Weather Icon">`;
                mainCityCard.querySelector('.feels-like').innerHTML = `<i class="wi wi-alien"></i> Feels like: ${Math.round(currentWeather.main.feels_like)}&deg;C`;
                mainCityCard.querySelector('.humidity').innerHTML = `<i class="wi wi-humidity"></i> Humidity: ${currentWeather.main.humidity}%`;
                mainCityCard.querySelector('.temp-max').innerHTML = `<i class="wi wi-thermometer"></i> Max Temp: ${Math.round(currentWeather.main.temp_max)}&deg;C`;
                mainCityCard.querySelector('.temp-min').innerHTML = `<i class="wi wi-thermometer-exterior"></i> Min Temp: ${Math.round(currentWeather.main.temp_min)}&deg;C`;
                mainCityCard.querySelector('.wind-speed').innerHTML = `<i class="wi wi-strong-wind Wind speed"></i> Wind Speed: ${currentWeather.wind.speed}m/s`
                mainCityCard.querySelector('.pressure').innerHTML = `<i class="wi wi-barometer"></i> Pressure: ${currentWeather.main.pressure}hPa`
                mainCityCard.querySelector('.visibility').innerHTML = `<i class="wi wi-small-craft-advisory"></i> Visibility: ${currentWeather.visibility / 1000}km`
                mainCityCard.querySelector('.sunrise-time').innerHTML = `${new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                mainCityCard.querySelector('.sunset-time').innerHTML = `${new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
            })
            .catch(error => {
                console.error('Error fetching current weather data:', error);
            });
        fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${cityname},${code}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const dailyForecast = data.list.slice(8).filter((item, index) => index % 8 === 0);
                dailyForecast.push(data.list[39])
                console.log(dailyForecast)
                const dailyforecastDates = mainCityCard.querySelectorAll('.daily-date');
                dailyforecastDates.forEach((elm, index) => {
                    elm.innerHTML = new Date(dailyForecast[index].dt_txt).toLocaleString('en-US', { day: 'numeric', month: 'short' });
                });
                const dailyIcons = mainCityCard.querySelectorAll('.daily-icon');
                dailyIcons.forEach((elm, index) => {
                    elm.innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyForecast[index].weather[0].icon}.png" alt="Weather Icon">`;
                });

                const dailyTemps = mainCityCard.querySelectorAll('.daily-temp');
                dailyTemps.forEach((elm, index) => {
                    elm.innerHTML = `${Math.round(dailyForecast[index].main.temp)}&deg;C`;
                });
            })
    }

    const interval = 10 * 60 * 1000; // 10 минут
    updateWeather(); 
    setInterval(updateWeather, interval);
}
