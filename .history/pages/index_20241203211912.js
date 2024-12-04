import WeatherApp from '../components/WeatherApp';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

const Home = () => {
    return (
        <div className={styles.container}>
            <img 
            src="/logo.svg" 
            alt="Logo" 
            width={100} 
            height={100} 
            className={styles.logo} 
            />
            <h1>Weather2.0</h1>
            <WeatherApp />
        </div>
    );
};

export default Home;

