// WeatherCardListItem.js
import PropTypes from 'prop-types';

const WeatherCardListItem = ({ city, temperature, condition }) => {
  return (
    <div>
      <h2>{city}</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Condition: {condition}</p>
    </div>
  );
};

WeatherCardListItem.propTypes = {
  city: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  condition: PropTypes.string.isRequired,
};

export default WeatherCardListItem;
