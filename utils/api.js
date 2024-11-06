import axios from 'axios';

export const fetchWeatherData = async (city) => {
  const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}`);
  return response.data;
};
