import Image from "next/image";
import localFont from "next/font/local";
import Head from 'next/head';
import WeatherDisplay from '../components/WeatherDisplay';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
      </Head>

      <h1 className={styles.heading}>Weather App</h1>
      <WeatherDisplay />
    </div>
  );
}
