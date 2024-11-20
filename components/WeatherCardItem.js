import PropTypes from 'prop-types';

const WeatherCardItem = ({ city, temperature, condition, icon }) => {
  const iconUrl = icon.startsWith('http') ? icon : `https:${icon}`;

  return (
    <div>
      <h2>{city}</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Condition: {condition}</p>
      <img src={iconUrl} alt={condition} />
    </div>
  );
};

WeatherCardItem.propTypes = {
  city: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  condition: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default WeatherCardItem;
