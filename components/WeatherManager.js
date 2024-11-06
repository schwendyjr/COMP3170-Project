// components/WeatherManager.js
import { useState } from 'react';
import { fetchWeatherData } from '../utils/api';
import WeatherCardList from './WeatherCardList';
import styles from '../styles/WeatherManager.module.css';

const cities = ['Vancouver', 'New York', 'London', 'Tokyo', 'Sydney'];

export default function WeatherManager() {
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
    <div className={styles.container}>
      <button className={styles.button} onClick={handleFetchData}>Fetch Weather</button>
      <button className={styles.button} onClick={handleClearData}>Clear Data</button>

      {error && <p>{error}</p>}
      {weatherData.length > 0 && <WeatherCardList weatherData={weatherData} />}
    </div>
  );
}
