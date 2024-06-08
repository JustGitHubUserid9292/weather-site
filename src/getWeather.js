export default function getWeather() {
    fetch('https://api.openweathermap.org/data/2.5/group?id=524901,498817,1496747,551487,1486209&appid=1693c13db95a0c2b55b2ed680a6b20a6').then(response => response.json()).then(data => {
        console.log(data)
        const mainCityCard = document.querySelector('.main-city');    
        const otherCityCards = document.querySelectorAll('.city-card');
        mainCityCard.querySelector('h1').innerHTML = data.list[0].name
        mainCityCard.querySelector('p').innerHTML = `${Math.round(data.list[0].main.temp - 273)}&deg;C, ${data.list[0].weather[0].description}<br><br><img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png" alt="Weather Icon">`;
        otherCityCards.forEach(elm => {
            elm.querySelector('h2').innerHTML = data.list[Number(elm.attributes.num.textContent)].name
            elm.querySelector('p').innerHTML = `${Math.round(data.list[Number(elm.attributes.num.textContent)].main.temp - 273)}&deg;C, ${data.list[Number(elm.attributes.num.textContent)].weather[0].description}<br><br><img src="http://openweathermap.org/img/wn/${data.list[Number(elm.attributes.num.textContent)].weather[0].icon}.png" alt="Weather Icon">`;
        })
    })
}


//https://api.openweathermap.org/data/2.5/group?id=524901,498817,1496747,551487,1486209&appid=1693c13db95a0c2b55b2ed680a6b20a6