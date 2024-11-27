import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';

const Forecast = ({ city }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError(null);  // Reset any previous errors
        console.log(`Fetching forecast for ${city}...`);

        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&days=5`
        );
        
        if (!res.ok) {
          throw new Error('Failed to fetch forecast data');
        }

        const data = await res.json();
        console.log('Fetched data:', data);

        // Check if forecast data exists
        if (data?.forecast?.forecastday) {
          setForecastData(data.forecast.forecastday);
        } else {
          throw new Error('No forecast data found');
        }
      } catch (err) {
        console.error('Error fetching forecast:', err);
        setError(err.message || 'Error fetching weather data');
      } finally {
        setLoading(false);  // Make sure to turn off loading state
      }
    };

    fetchForecast();
  }, [city]);

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;
  if (!forecastData) return <p>No forecast available</p>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        5-Day Forecast for {city}
      </Typography>

      <Grid container spacing={2}>
        {forecastData.map((day) => (
          <Grid item xs={12} sm={6} md={4} key={day.date}>
            <Box
              sx={{
                backgroundColor: '#f0f0f0',
                padding: 2,
                borderRadius: 2,
                textAlign: 'center',
                boxShadow: 1,
              }}
            >
              <Typography variant="h6">{new Date(day.date).toLocaleDateString()}</Typography>
              <Typography variant="body1">{day.day.avgtemp_c}°C</Typography>
              <Typography variant="body2">{day.day.condition.text}</Typography>
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: 'contain',
                  marginTop: 1,
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

Forecast.propTypes = {
  city: PropTypes.string.isRequired,
};

export default Forecast;
