import getWeather from "./getWeather.js";
import getCitiesID from "./getCitiesID.js";

export default function app() {
    const otherCities = document.querySelector('.other-cities')
    const buttons = document.querySelectorAll('.city-card');
    const mainCityCard = document.querySelector('.main-city');
    const formSection = document.querySelector('.form-container')
    const refresh = document.querySelector('.refresh-cities-button')
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formDataObject = {};
            formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        const listOfCities = Object.values(formDataObject)
        if (listOfCities.join('').length === 0) {
            getWeather()
        } else {
            Promise.all(getCitiesID(listOfCities)).then(result => {
                const defaultCitiesID = ['524901','498817','1496747','551487','1486209'];
                if (result.includes(false)) {
                    console.log(result);
                    for (let i = 0; i < result.length; i++) {
                        if (result[i] === false) {
                            result[i] = defaultCitiesID[i];
                        }
                    }
                    getWeather(result);
                }
                getWeather(result);
            })
        }
        mainCityCard.classList.remove('hidden')
        otherCities.classList.remove('hidden')
        formSection.classList.add('hidden')
    })
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const infoReplace = {
                city: btn.querySelector('h2').innerHTML,
                weather: btn.querySelector('p').innerHTML,
                additional_info: btn.querySelector('.additional-info').innerHTML,
                hourly_forecast: btn.querySelector('.hourly-forecast').innerHTML
            };
            const mainInfo = {
                city: mainCityCard.querySelector('h1').innerHTML,
                weather: mainCityCard.querySelector('p').innerHTML,
                additional_info: mainCityCard.querySelector('.additional-info').innerHTML,
                hourly_forecast: mainCityCard.querySelector('.hourly-forecast').innerHTML
            };
            mainCityCard.querySelector('h1').innerHTML = infoReplace.city;
            mainCityCard.querySelector('p').innerHTML = infoReplace.weather;
            mainCityCard.querySelector('.additional-info').innerHTML = infoReplace.additional_info
            mainCityCard.querySelector('.hourly-forecast').innerHTML = infoReplace.hourly_forecast
            btn.querySelector('h2').innerHTML = mainInfo.city;
            btn.querySelector('p').innerHTML = mainInfo.weather;
            btn.querySelector('.additional-info').innerHTML = mainInfo.additional_info
            btn.querySelector('.hourly-forecast').innerHTML = mainInfo.hourly_forecast
        });
        refresh.addEventListener('click', () => {
            const title = document.querySelector('.form-title')
            title.textContent = 'You can change previously selected cities.'
            mainCityCard.classList.add('hidden')
            otherCities.classList.add('hidden')
            formSection.classList.remove('hidden')
        })
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


