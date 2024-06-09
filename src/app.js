import getWeather from "./getWeather";

export default function app() {
    getWeather()
    const buttons = document.querySelectorAll('.city-card');
    const mainCityCard = document.querySelector('.main-city');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const infoReplace = {
                city: btn.querySelector('h2').innerHTML,
                weather: btn.querySelector('p').innerHTML,
                additional_info: btn.querySelector('.additional-info').innerHTML
            };
            const mainInfo = {
                city: mainCityCard.querySelector('h1').innerHTML,
                weather: mainCityCard.querySelector('p').innerHTML,
                additional_info: mainCityCard.querySelector('.additional-info').innerHTML
            };
            mainCityCard.querySelector('h1').innerHTML = infoReplace.city;
            mainCityCard.querySelector('p').innerHTML = infoReplace.weather;
            mainCityCard.querySelector('.additional-info').innerHTML = infoReplace.additional_info
            btn.querySelector('h2').innerHTML = mainInfo.city;
            btn.querySelector('p').innerHTML = mainInfo.weather;
            btn.querySelector('.additional-info').innerHTML = mainInfo.additional_info
        });
        function updateDate() {
            const dateElement = document.getElementById('current-date');
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            const today = new Date();
            const dateString = today.toLocaleDateString('en-US', options);
            dateElement.textContent = dateString;
        }
        
        const interval = 24 * 60 * 60 * 1000
        updateDate();
        setInterval(updateDate, interval); 
        
    });
}


