import { useState } from 'react';

const cities = ['Vancouver', 'New York', 'London', 'Tokyo', 'Sydney'];

const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=5bf6ec0f9c90c8da5fff2413daafec69&query=${city}`
    );
    const data = await response.json();


    // Trying to catch an API error dwbi we technically don't need this
    if (!response.ok || data.error) {
      throw new Error(data.error?.info || 'Sorry, failed to fetch weather data, try again.');
    }

    return data;
  } catch (err) {
    console.error(`Error fetching data for ${city}:`, err);
    return null;
  }
};

export default function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    try {
      const dataPromises = cities.map((city) => fetchWeatherData(city));
      const dataResults = await Promise.all(dataPromises);

      const validData = dataResults.filter((data) => data !== null);
      setWeatherData(validData);

      if (validData.length < cities.length) {
        setError('Some cities could not be fetched.');
      } else {
        setError(null);
      }
    } catch (err) {
      console.error('Error during fetching data:', err);
      setError('Failed to fetch weather data.');
      setWeatherData([]);
    }
  };

  const handleClearData = () => {
    setWeatherData([]);
    setError(null);
  };

  const handleMouseEnter = (e) => {
    e.target.style.transform = 'scale(1.05)';
    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Weather Display</h1>
      <button
        style={styles.button}
        onClick={handleFetchData}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Fetch Weather
      </button>
      <button
        style={{ ...styles.button, ...styles.buttonClear }}
        onClick={handleClearData}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Clear Data
      </button>

      {error && <p style={styles.error}>{error}</p>}
      {weatherData.length > 0 && (
        <ul style={styles.list}>
          {weatherData.map((data, index) => (
            <li key={index} style={styles.listItem}>
              <h3 style={styles.cityName}>City: {data.location?.name || 'Unknown'}</h3>
              <p style={styles.weatherInfo}>
                Temperature: {data.current?.temperature ?? 'N/A'} °C
              </p>
              <p style={styles.weatherInfo}>
                Description: {data.current?.weather_descriptions?.[0] || 'No description available'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Styling, wanted to go for a nice bright blue and yellow combo.
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f8ff', // Lightish blue background
    color: '#2c3e50', // Darkish blue text
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: '36px',
    marginBottom: '20px',
    color: '#2c3e50',
    textAlign: 'center',
    borderBottom: '2px solid #3498db', // Blue accents
    paddingBottom: '10px',
  },
  button: {
    backgroundColor: '#3498db', // Vibrant blue
    color: 'white',
    border: '2px solid #2980b9', // Dark blue border
    padding: '10px 20px',
    borderRadius: '5px',
    margin: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  buttonClear: {
    backgroundColor: '#f1c40f', // Yellow accent
    border: '2px solid #f39c12', // Slightly darker yellow border
  },
  error: {
    color: '#e74c3c', // Red for errors
    fontSize: '18px',
    margin: '10px 0',
    border: '2px solid #e57373', // Light red border
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#ffebee', // Light pink background
    maxWidth: '600px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: '20px auto',
    maxWidth: '600px',
  },
  listItem: {
    backgroundColor: 'white',
    border: '2px solid #dfe6e9', // Light gray border
    borderRadius: '10px',
    margin: '10px 0',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow
    textAlign: 'left',
  },
  cityName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2980b9', // Blue accent
    borderBottom: '1px solid #dfe6e9', // Divider under city name
    paddingBottom: '5px',
  },
  weatherInfo: {
    margin: '5px 0',
    color: '#34495e',
  },
};
