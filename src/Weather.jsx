// src/Weather.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const apiKey = 'c0ee7aa0acf94552b6312745241705';

    const getWeather = async () => {
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
            setWeatherData(response.data);
            setError(null);
        } catch (error) {
            setWeatherData(null);
            setError('City not found');
        }
    };

    return (
        <div className="weather-container">
            <h1>Weather</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={getWeather}>Get Weather</button>
            {error && <p>{error}</p>}
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
                    <p>Temperature: {weatherData.current.temp_c}°C</p>
                    <p>Condition: {weatherData.current.condition.text}</p>
                    <img src={weatherData.current.condition.icon} alt="weather icon" />
                </div>
            )}
        </div>
    );
};

export default Weather;
