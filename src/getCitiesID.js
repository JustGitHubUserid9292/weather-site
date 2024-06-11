export default function getCitiesID(list) {
    return list.map(cityName => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1693c13db95a0c2b55b2ed680a6b20a6`).then(response => response.json()).then(data => {
        return !data.id ? false : data.id.toString()
    }))
}