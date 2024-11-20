// WeatherSearch.js
import { useState } from 'react';
import axios from 'axios';
import WeatherCardItem from './WeatherCardItem';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}`);
      console.log(response.data); 
      if (response.data && response.data.location && response.data.current) {
        setWeatherData(response.data);
      } else {
        setError('City not found or data is incomplete');
      }
    } catch (err) {
      setError('City not found');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && weatherData.location && weatherData.current && (
        <WeatherCardItem
          city={weatherData.location.name}
          temperature={weatherData.current.temp_c}
          condition={weatherData.current.condition.text}
        />
      )}
    </div>
  );
};

export default WeatherSearch;
