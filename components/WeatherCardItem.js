// components/WeatherCardItem.js
import { Card, CardContent, Typography } from '@mui/material';
import styles from '../styles/WeatherCardItem.module.css';

const WeatherCardItem = ({ weather }) => (
  <Card className={styles.card}>
    <CardContent>
      <Typography variant="h5">{weather.location.name}</Typography>
      <Typography>Temperature: {weather.current.temp_c} °C</Typography>
      <Typography>Condition: {weather.current.condition.text}</Typography>
    </CardContent>
  </Card>
);

export default WeatherCardItem;
