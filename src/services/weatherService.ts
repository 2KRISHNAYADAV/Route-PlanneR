import { WeatherData } from '../types/travel';

export function getWeatherDescription(code: number): string {
  switch (code) {
    case 0: return 'Clear sunny skies';
    case 1: return 'Mainly sunny with light breeze';
    case 2: return 'Partly cloudy';
    case 3: return 'Overcast';
    case 45:
    case 48: return 'Morning fog & haze';
    case 51:
    case 53:
    case 55: return 'Light intermittent drizzle';
    case 61:
    case 63:
    case 65: return 'Rain showers';
    case 80:
    case 81:
    case 82: return 'Passing rain showers';
    default: return 'Pleasant mild weather';
  }
}

export async function fetchUdaipurWeather(): Promise<WeatherData | null> {
  try {
    const lat = 24.5854;
    const lng = 73.7125;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=Asia%2FKolkata`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Weather API status: ${res.status}`);
    }

    const data = await res.json();
    const current = data.current;
    const daily = data.daily;

    const sunriseStr = daily?.sunrise?.[0] ? new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:48 AM';
    const sunsetStr = daily?.sunset?.[0] ? new Date(daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '05:42 PM';
    const rainProb = daily?.precipitation_probability_max?.[0] ?? 0;

    return {
      currentTemp: Math.round(current.temperature_2m),
      apparentTemp: Math.round(current.apparent_temperature),
      weatherDescription: getWeatherDescription(current.weather_code),
      weatherCode: current.weather_code,
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      rainProbability: rainProb,
      sunrise: sunriseStr,
      sunset: sunsetStr,
      isLive: true,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  } catch (err) {
    console.warn('Live weather unavailable, fallback to offline notice:', err);
    return null;
  }
}
