import { useState } from 'react';

const cities = ['Vancouver', 'New York', 'London', 'Tokyo', 'Sydney'];

const fetchWeatherData = async (city) => {
  const response = await fetch(`http://api.weatherstack.com/current?access_key=5bf6ec0f9c90c8da5fff2413daafec69&query=${city}`);
  const data = await response.json();
  console.log(data);
  return data;
};

export default function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    try {
      const dataPromises = cities.map(city => fetchWeatherData(city));
      const dataResults = await Promise.all(dataPromises);
      setWeatherData(dataResults);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data.');
      setWeatherData([]);
    }
  };

  const handleClearData = () => {
    setWeatherData([]);
    setError(null);
  };

  return (
    <div>
      <button onClick={handleFetchData}>Fetch Weather</button>
      <button onClick={handleClearData}>Clear Data</button>

      {error && <p>{error}</p>}
      {weatherData.length > 0 && (
        <ul>
          {weatherData.map((data, index) => (
            <li key={index}>
              <h3>City: {data.location.name}</h3>
              <p>Temperature: {data.current.temperature} °C</p>
              <p>Description: {data.current.weather_descriptions[0]}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
