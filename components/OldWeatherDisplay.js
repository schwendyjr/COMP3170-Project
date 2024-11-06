//**old single page setup --> moved components to folder */

// import { useState } from 'react';
// import styles from '../styles/Home.module.css';
// import { fetchWeatherData } from '../utils/api';

// const cities = ['Vancouver', 'New York', 'London', 'Tokyo', 'Sydney'];

// export default function WeatherDisplay() {
//   const [weatherData, setWeatherData] = useState([]);
//   const [error, setError] = useState(null);

//   const handleFetchData = async () => {
//     try {
//       const dataPromises = cities.map(city => fetchWeatherData(city));
//       const dataResults = await Promise.all(dataPromises);
//       setWeatherData(dataResults);
//       setError(null);
//     } catch (err) {
//       setError('Failed to fetch data.');
//       setWeatherData([]);
//     }
//   };

//   const handleClearData = () => {
//     setWeatherData([]);
//     setError(null);
//   };

//   return (
//     <div>
//       <button className={styles.button} onClick={handleFetchData}>Fetch Weather</button>
//       <button className={styles.button} onClick={handleClearData}>Clear Data</button>

//       {error && <p>{error}</p>}
//       {weatherData.length > 0 && (
//         <ul className={styles.list}>
//           {weatherData.map((data, index) => (
//             <li key={index} className={styles.item}>
//               {data.location ? (
//                 <>
//                   <h3>City: {data.location.name}</h3>
//                   <p>Temperature: {data.current.temp_c} °C</p>
//                   <p>Condition: {data.current.condition.text}</p>
//                 </>
//               ) : (
//                 <p>Error: Weather data for this city is unavailable.</p>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
