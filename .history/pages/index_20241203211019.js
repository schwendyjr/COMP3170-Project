import WeatherApp from '../components/WeatherApp';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

const Home = () => {
    return (
        <div className={styles.container}>
            <h1>Weather2.0</h1>
            <WeatherApp />
        </div>
    );
};

export default Home;

