import { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherSearch from './WeatherSearch';
import Forecast from './Forecast';

const WeatherApp = () => {
    const [city, setCity] = useState('Vancouver');
    const [forecastData, setForecastData] = useState(null);
    const [recentSearches, setRecentSearches] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState('');

    const fetchWeatherData = async (cityName) => {
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${cityName}&days=5`);
            setForecastData(response.data);
            setError('');
            setRecentSearches((prevSearches) => [...new Set([response.data.location.name, ...prevSearches])]); // Add new search at the start
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
            setRecentSearches((prevSearches) => [...new Set([response.data.location.name, ...prevSearches])]); // Add new search at the start
        } catch (error) {
            setError('Location not found');
        }
    };

    const handleToggleFavorite = (cityName) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(cityName)) {
                return prevFavorites.filter(favorite => favorite !== cityName); // Remove from favorites
            } else {
                return [...prevFavorites, cityName]; // Add to favorites
            }
        });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                fetchWeatherDataByCoords(position.coords.latitude, position.coords.longitude);
            }, () => {
                fetchWeatherData('Vancouver'); // Fallback to default city (Vancouver) if geolocation fails
            });
        } else {
            fetchWeatherData('Vancouver'); // Fallback to default city (Vancouver) if geolocation is not supported
        }
    }, []);

    const isFavorited = (cityName) => favorites.includes(cityName);

    return (
        <>
                <div className="sidebar" style={{ width: '200px', padding: '10px', backgroundColor: '#f5f5f5', overflowY: 'auto', marginLeft: '10px' }}>
                <h2>Recent Searches</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {recentSearches.map((search, index) => (
                        <li key={index} style={{ cursor: 'pointer', padding: '5px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span onClick={() => fetchWeatherData(search)}>{search}</span>
                            <button onClick={() => handleToggleFavorite(search)}>
                                {isFavorited(search) ? '⭐' : '☆'}
                            </button>                        </li>
                    ))}
                </ul>
                <h2>Favorites</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {favorites.map((favorite, index) => (
                        <li key={index} style={{ cursor: 'pointer', padding: '5px 0' }} onClick={() => fetchWeatherData(favorite)}>
                            {favorite}
                        </li>
                    ))}
                </ul>
            </div>


        <div>
        <WeatherSearch city={city} setCity={setCity} fetchWeatherData={fetchWeatherData} />
                {error && <p>{error}</p>}
                {forecastData && <Forecast forecastData={forecastData} />}
        </div>
    </>
    );
};

export default WeatherApp;
