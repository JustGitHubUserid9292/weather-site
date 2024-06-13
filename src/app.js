import getWeather from "./getWeather.js";
import getCityID from "./getCitiesID.js";

export default function app() {
    const otherCities = document.querySelector('.other-cities')
    const mainCityCard = document.querySelector('.main-city');
    const searchInput = document.querySelector('#search-form')
    const refresh = document.querySelector('.refresh-cities-button')
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchCity = document.querySelector('#search-city')

    function handleInput(event) {
        const searchTerm = event.target.value
        const searchSuggestions = document.getElementById('search-suggestions');
    
        if (searchTerm.length === 0) {
            searchSuggestions.style.display = 'none';
            searchCity.removeAttribute('type')
            return;
        }
    
        const apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${searchTerm}&type=like&sort=population&cnt=5&appid=1693c13db95a0c2b55b2ed680a6b20a6`;
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displaySuggestions(data.list);
            })
            .catch(error => {
            });
    }
    function displaySuggestions(suggestions) {
        const searchSuggestions = document.getElementById('search-suggestions');
        const searchCity = document.getElementById('search-city');
        const ul = document.createElement('ul');
        ul.innerHTML = '';
    
        suggestions.forEach(city => {
            const li = document.createElement('li');
            li.textContent = `${city.name}, ${city.sys.country}`;
            li.addEventListener('click', () => {
                searchCity.value = '';
                getWeather(city.name, city.sys.country);
                searchSuggestions.style.display = 'none';
                searchCity.removeAttribute('type');
            });
            ul.appendChild(li);
        });
    
        searchSuggestions.innerHTML = '';
        searchSuggestions.appendChild(ul);
    
        if (suggestions.length === 0) {
            searchCity.removeAttribute('type');
            searchSuggestions.style.display = 'none';
        } else {
            searchCity.setAttribute('type', 'active');
            searchSuggestions.style.display = 'block';
        }
    }

    searchInput.addEventListener('input', handleInput)
    getWeather();
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
}


