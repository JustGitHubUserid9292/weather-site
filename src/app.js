import getWeather from "./getWeather";

export default function app() {
    getWeather()
    const buttons = document.querySelectorAll('.city-card');
    const mainCityCard = document.querySelector('.main-city');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const infoReplace = {
                city: btn.querySelector('h2').innerHTML,
                weather: btn.querySelector('p').innerHTML
            };
            const mainInfo = {
                city: mainCityCard.querySelector('h1').innerHTML,
                weather: mainCityCard.querySelector('p').innerHTML
            };
            mainCityCard.querySelector('h1').innerHTML = infoReplace.city;
            mainCityCard.querySelector('p').innerHTML = infoReplace.weather;
            btn.querySelector('h2').innerHTML = mainInfo.city;
            btn.querySelector('p').innerHTML = mainInfo.weather;
        });
    });
}
