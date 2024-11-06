// components/WeatherCardList.js
import WeatherCardItem from './WeatherCardItem';
import styles from '../styles/WeatherCardList.module.css';

const WeatherCardList = ({ weatherData }) => (
  <ul className={styles.list}>
    {weatherData.map((data, index) => (
      <li key={index} className={styles.item}>
        <WeatherCardItem weather={data} />
      </li>
    ))}
  </ul>
);

export default WeatherCardList;
