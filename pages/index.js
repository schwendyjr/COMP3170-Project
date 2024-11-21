import Head from 'next/head';
import WeatherHeader from '../components/WeatherHeader';
import WeatherSearch from '@/components/WeatherSearch';
import styles from '../styles/Home.module.css';


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather 2.0</title>
      </Head>

      <WeatherHeader />
      <WeatherSearch />
    </div>
  );
}
