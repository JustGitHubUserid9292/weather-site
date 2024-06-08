export default function getWeather() {
    function updateWeather() {
        fetch('https://api.openweathermap.org/data/2.5/group?id=524901,498817,1496747,551487,1486209&appid=1693c13db95a0c2b55b2ed680a6b20a6')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const mainCityCard = document.querySelector('.main-city');
                const otherCityCards = document.querySelectorAll('.city-card');
                mainCityCard.querySelector('h1').innerHTML = data.list[0].name;
                mainCityCard.querySelector('p').innerHTML = `${Math.round(data.list[0].main.temp - 273)}&deg;C, ${data.list[0].weather[0].description}<br><br><img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png" alt="Weather Icon">`;
                mainCityCard.querySelector('.feels-like').innerHTML = `<i class="wi wi-alien"></i> Feels like: ${Math.round(data.list[0].main.feels_like - 273)}&deg;C`
                mainCityCard.querySelector('.humidity').innerHTML = `<i class="wi wi-humidity"></i> Humidity: ${data.list[0].main.humidity}%`;
                mainCityCard.querySelector('.temp-max').innerHTML = `<i class="wi wi-thermometer"></i> Max Temp: ${Math.round(data.list[0].main.temp_max - 273)}&deg;C`;
                mainCityCard.querySelector('.temp-min').innerHTML = `<i class="wi wi-thermometer-exterior"></i> Min Temp: ${Math.round(data.list[0].main.temp_min - 273)}&deg;C`;
                otherCityCards.forEach(elm => {
                    elm.querySelector('h2').innerHTML = data.list[Number(elm.attributes.num.textContent)].name;
                    elm.querySelector('p').innerHTML = `${Math.round(data.list[Number(elm.attributes.num.textContent)].main.temp - 273)}&deg;C, ${data.list[Number(elm.attributes.num.textContent)].weather[0].description}<br><br><img src="http://openweathermap.org/img/wn/${data.list[Number(elm.attributes.num.textContent)].weather[0].icon}.png" alt="Weather Icon">`;
                    elm.querySelector('.additional-info').querySelector('.feels-like').innerHTML = `<i class="wi wi-alien"></i> Feels like: ${Math.round(data.list[Number(elm.attributes.num.textContent)].main.feels_like - 273)}&deg;C`
                    elm.querySelector('.additional-info').querySelector('.humidity').innerHTML = `<i class="wi wi-humidity"></i> Humidity: ${data.list[Number(elm.attributes.num.textContent)].main.humidity}%`;
                    elm.querySelector('.additional-info').querySelector('.temp-max').innerHTML = `<i class="wi wi-thermometer"></i> Max Temp: ${Math.round(data.list[Number(elm.attributes.num.textContent)].main.temp_max - 273)}&deg;C`;
                    elm.querySelector('.additional-info').querySelector('.temp-min').innerHTML = `<i class="wi wi-thermometer-exterior"></i> Min Temp: ${Math.round(data.list[Number(elm.attributes.num.textContent)].main.temp_min - 273)}&deg;C`;
                });
            })
            .catch(error => {
                console.error('Error when retrieving weather data:', error);
            });
    }
    const interval = 60 * 1000; // 1 минута
    updateWeather();
    setTimeout(updateWeather, interval);
}


//https://api.openweathermap.org/data/2.5/group?id=524901,498817,1496747,551487,1486209&appid=1693c13db95a0c2b55b2ed680a6b20a6