import WeatherCardItem from './WeatherCardItem';

const Forecast = ({ forecastData }) => {
    const { location, forecast } = forecastData;

    return (
        <div>
            <h2 style={{ textAlign: 'center', width: '100%'}}>Weather Forecast for {location.name}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {forecast.forecastday.map((day) => (
                    <WeatherCardItem key={day.date} day={day} />
                ))}
            </div>
        </div>
    );
};

export default Forecast;
