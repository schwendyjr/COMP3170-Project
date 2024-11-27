// WeatherSearch.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCardItem from './WeatherCardItem';


const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Function to fetch weather data
  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}`);
      if (response.data && response.data.location && response.data.current) {
        setWeatherData(response.data);
        setError(''); // Clear any previous error
      } else if (isSearching) {
        setError('City not found or data is incomplete');
      }
    } catch (err) {
      if (isSearching) {
        setError('City not found');
      }
    }
  };

//   // Use useEffect to fetch Vancouver's weather data on component mount
//   useEffect(() => {
//     fetchWeatherData('Vancouver');
//   }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setError('');
    fetchWeatherData(city);
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
          icon={weatherData.current.condition.icon}
        />
      )}
    </div>
  );
};

export default WeatherSearch;
