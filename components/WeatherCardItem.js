import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const WeatherCardItem = ({ city, temperature, condition, icon }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        padding: 2,
        borderRadius: 2,
        textAlign: 'center',
        boxShadow: 1,
        minWidth: 150,
      }}
    >
      <Typography variant="h6">{city}</Typography>
      <Typography variant="body1">{temperature}°C</Typography>
      <Typography variant="body2">{condition}</Typography>
      <img
        src={`https:${icon}`}
        alt={condition}
        style={{
          width: 40,
          height: 40,
          objectFit: 'contain',
          marginTop: 8,
        }}
      />
    </Box>
  );
};

WeatherCardItem.propTypes = {
  city: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  condition: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default WeatherCardItem;
