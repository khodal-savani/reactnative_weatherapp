/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { getWeatherData } from './src/services/weatherService';
import WeatherSearch from './src/components/WeatherSearch';
import WeatherCard from './src/components/WeatherCard';

const App = () => {
    const [location, setLocation] = useState('New York');
    const [lat, setLat] = useState(40.7128);
    const [lon, setLon] = useState(-74.0060);
    const [weatherData, setWeatherData] = useState<any>(null);

    useEffect(() => {
        fetchWeather();
    }, [lat, lon]);

    const fetchWeather = async () => {
        try {
            const data = await getWeatherData(lat, lon);
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleLocationSelected = (latitude: number, longitude: number, locationName: string) => {
        setLat(latitude);
        setLon(longitude);
        setLocation(locationName);
    };

    return (
        <View>
            <WeatherSearch onLocationSelected={handleLocationSelected} />
            {weatherData && (
                <WeatherCard
                    location={location}
                    currentTemp={weatherData.current_weather.temperature}
                    weatherCode={weatherData.current_weather.weathercode.toString()}
                    forecast={weatherData.daily.temperature_2m_max.map((temp: number, index: number) => ({
                        day: new Date(weatherData.daily.time[index]).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                        maxTemp: temp,
                        minTemp: weatherData.daily.temperature_2m_min[index],
                        weatherCode: weatherData.daily.weathercode[index].toString(),
                    }))}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    locationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default App;
