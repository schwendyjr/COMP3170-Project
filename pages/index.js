import WeatherApp from '../components/WeatherApp';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

const Home = () => {
    return (
        <div className={styles.container}>
            <header>
            <img 
            src="./logo.png" 
            alt="Logo" 
            width={100} 
            className={styles.logo} 
            />
            </header>
            <h1 className="weatherHeader">Weather2.0</h1>
            <WeatherApp />
        </div>
    );
};

export default Home;

