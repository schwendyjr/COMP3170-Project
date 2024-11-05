import Image from "next/image";
import localFont from "next/font/local";
import WeatherDisplay from '../components/WeatherDisplay';




export default function Home() {
  return (
    <div className="container">
      <h1>Weather App</h1>
      <WeatherDisplay />
    </div>
  );
}
