import axios from 'axios'

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

export const hasWeatherApiKey = Boolean(import.meta.env.VITE_OPENWEATHER_API_KEY)

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 8000,
})

export async function fetchWeatherForCity(city) {
  if (!hasWeatherApiKey) return city

  const { data } = await apiClient.get('', {
    params: {
      q: city.apiQuery,
      appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  })

  return {
    ...city,
    temp: Math.round(data.main.temp),
    status: data.weather?.[0]?.description || city.status,
    humidity: data.main.humidity ?? city.humidity,
    windSpeed: data.wind?.speed ?? city.windSpeed,
    weatherIcon: weatherIconFor(data.weather?.[0]?.main),
  }
}

export async function fetchWeatherForCities(cities) {
  return Promise.all(cities.map((city) => fetchWeatherForCity(city)))
}

function weatherIconFor(condition) {
  if (condition === 'Rain' || condition === 'Drizzle') return '🌧️'
  if (condition === 'Clouds') return '🌤️'
  if (condition === 'Snow') return '❄️'
  if (condition === 'Thunderstorm') return '⛈️'
  return '☀️'
}
