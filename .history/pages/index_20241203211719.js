import WeatherApp from '../components/WeatherApp';
import styles from '../styles/Home.module.css';
import Image from '../public/logo.svg';

const Home = () => {
    return (
        <div className={styles.container}>
            <img src="/public/logo.svg" alt="" className={styles.logo} />
            <h1>Weather2.0</h1>
            <WeatherApp />
        </div>
    );
};

export default Home;
