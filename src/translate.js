import i18next from "i18next";

const resources = {
    en: {
      translation: {
        "search_city_placeholder": "🔎 Search for a city",
        "hourly_forecast_title": "Today at:",
        "daily_forecast_title": "5 Days Forecast:",
        "feels_like": "Feels like: ",
        "humidity": "Humidity: ",
        "max_temp": "Max Temp: ",
        "min_temp": "Min Temp: ",
        "wind_speed": "Wind Speed: ",
        "pressure": "Pressure: ",
        "visibility": "Visibility: ",
        "sunrise": "Sunrise",
        "sunset": "Sunset"
      }
    },
    ru: {
      translation: {
        "search_city_placeholder": "🔎 Поиск города",
        "hourly_forecast_title": "Сегодня в:",
        "daily_forecast_title": "Прогноз на 5 дней:",
        "feels_like": "Ощущается как: ",
        "humidity": "Влажность: ",
        "max_temp": "Макс. температура: ",
        "min_temp": "Мин. температура: ",
        "wind_speed": "Скорость ветра: ",
        "pressure": "Давление: ",
        "visibility": "Видимость: ",
        "sunrise": "Восход",
        "sunset": "Закат"
      }
    }
  };

  i18next.init({
    resources,
    lng: "en", // язык по умолчанию
    keySeparator: false, // we do not use keys in form messages.welcome
  }, function(err, t) {
    updateContent();
  });

  function updateContent() {
    document.querySelector('#search-city').placeholder = i18next.t('search_city_placeholder');
    document.querySelector('.hourly-forecast-title').innerText = i18next.t('hourly_forecast_title');
    document.querySelector('.daily-forecast-title').innerText = i18next.t('daily_forecast_title');
    document.querySelector('.feels-like').innerHTML = '<i class="wi wi-alien"></i> ' + i18next.t('feels_like') + '21°C';
    document.querySelector('.humidity').innerHTML = '<i class="wi wi-humidity"></i> ' + i18next.t('humidity') + '83%';
    document.querySelector('.temp-max').innerHTML = '<i class="wi wi-thermometer"></i> ' + i18next.t('max_temp') + '21°C';
    document.querySelector('.temp-min').innerHTML = '<i class="wi wi-thermometer-exterior"></i> ' + i18next.t('min_temp') + '19°C';
    document.querySelector('.wind-speed').innerHTML = '<i class="wi wi-strong-wind"></i> ' + i18next.t('wind_speed') + '4.18m/s';
    document.querySelector('.pressure').innerHTML = '<i class="wi wi-barometer"></i> ' + i18next.t('pressure') + '1010hPa';
    document.querySelector('.visibility').innerHTML = '<i class="wi wi-small-craft-advisory"></i> ' + i18next.t('visibility') + '10km';
    document.querySelector('.sunrise-title').innerText = i18next.t('sunrise');
    document.querySelector('.sunset-title').innerText = i18next.t('sunset');
  }

export default function changeLanguage(lng) {
    i18next.changeLanguage(lng, () => {
      updateContent();
    });
}