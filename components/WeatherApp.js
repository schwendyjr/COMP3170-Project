import { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherSearch from './WeatherSearch';
import Forecast from './Forecast';

const WeatherApp = () => {
    const [city, setCity] = useState('Vancouver');
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState('');

    const fetchWeatherData = async (cityName) => {
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${cityName}&days=5`);
            setForecastData(response.data);
            setError('');
        } catch (error) {
            setError('City not found');
        }
    };

    const fetchWeatherDataByCoords = async (latitude, longitude) => {
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latitude},${longitude}&days=5`);
            setForecastData(response.data);
            setCity(response.data.location.name);
            setError('');
        } catch (error) {
            setError('Location not found');
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                fetchWeatherDataByCoords(position.coords.latitude, position.coords.longitude);
            }, () => {
                // Fallback to default city (Vancouver) if geolocation fails
                fetchWeatherData('Vancouver');
            });
        } else {
            // Fallback to default city (Vancouver) if geolocation is not supported
            fetchWeatherData('Vancouver');
        }
    }, []);

    return (
        <div>
            <WeatherSearch city={city} setCity={setCity} fetchWeatherData={fetchWeatherData} />
            {error && <p>{error}</p>}
            {forecastData && <Forecast forecastData={forecastData} />}
        </div>
    );
};

export default WeatherApp;
