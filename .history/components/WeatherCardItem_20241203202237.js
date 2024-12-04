import { formatDate } from '../utils/formatDate';
import styles from '../styles/Home.module.css';

const WeatherCardItem = ({ day }) => {
    return (
        <div>
            <h3 className={styles.weatherCard}>{formatDate(day.date)}</h3>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
            <p>Temperature: {day.day.avgtemp_c}°C</p>
            <p>Condition: {day.day.condition.text}</p>
        </div>
    );
};

export default WeatherCardItem;
