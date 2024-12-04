import styles from '../styles/Home.module.css';
const WeatherSearch = ({ city, setCity, fetchWeatherData }) => {
  const handleInputChange = (e) => {
      setCity(e.target.value);
  };

  const handleSearch = (e) => {
      e.preventDefault();
      fetchWeatherData(city);
  };

  return (
      <form onSubmit={handleSearch} className={styles.searchForm}>
          <input type="text" value={city} onChange={handleInputChange} placeholder="Enter city" />
          <button type="submit">Search</button>
      </form>
  );
};

export default WeatherSearch;
