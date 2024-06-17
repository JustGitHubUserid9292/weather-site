import getWeather from "./getWeather.js";
import changeLanguage from "./translate.js";

export default function app() {
    const otherCities = document.querySelector('.other-cities')
    const mainCityCard = document.querySelector('.main-city');
    const searchInput = document.querySelector('#search-form')
    const translate = document.querySelector('.translate-button')
    const searchCity = document.querySelector('#search-city')
    const loader = document.querySelector('.loader-container')

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
                loader.classList.add('hidden')
                mainCityCard.classList.remove('hidden')
                translate.classList.remove('hidden')
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
    
    let count = 0;

    searchInput.addEventListener('input', handleInput)
    translate.addEventListener('click', () => {
       if (count % 2 === 0) {
         translate.textContent = 'ru'
       } else { translate.textContent = 'en'}
       changeLanguage(translate.textContent)
       count += 1
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


