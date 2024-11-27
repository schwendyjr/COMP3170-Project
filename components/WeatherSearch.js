import React, { useState } from 'react';
import axios from 'axios';
import WeatherCardItem from './WeatherCardItem';
import { Grid, Box, Button, TextField, Typography, CircularProgress } from '@mui/material';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState({
    weatherData: null,
    error: null,
    isSearching: false,
  });

  const fetchWeatherData = async (cityName) => {
    try {
      setState({ ...state, isSearching: true, error: null });
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${cityName}`
      );
      if (response.data?.location && response.data?.current) {
        setState({
          weatherData: response.data,
          error: null,
          isSearching: false,
        });
      } else {
        setState({ weatherData: null, error: 'Incomplete data.', isSearching: false });
      }
    } catch (error) {
      setState({
        weatherData: null,
        error: error.response?.data?.error?.message || 'City not found.',
        isSearching: false,
      });
    }
  };

  const handleInputChange = (e) => setCity(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Weather Search
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 3 }}>
        <TextField
          label="Enter City"
          variant="outlined"
          value={city}
          onChange={handleInputChange}
          sx={{ width: '300px' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={state.isSearching}
          sx={{ padding: '10px 20px' }}
        >
          {state.isSearching ? <CircularProgress size={24} /> : 'Search'}
        </Button>
      </Box>

      {state.error && <Typography color="error">{state.error}</Typography>}

      <Grid container spacing={3} justifyContent="Center">
        {state.weatherData && (
          <Grid item  sm={4} lg={6} >
            <WeatherCardItem
              city={state.weatherData.location.name}
              temperature={state.weatherData.current.temp_c}
              condition={state.weatherData.current.condition.text}
              icon={state.weatherData.current.condition.icon}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default WeatherSearch;
