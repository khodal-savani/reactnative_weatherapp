import axios from 'axios';

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';
const OPEN_METEO_GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const getWeatherData = async (lat: number, lon: number) => {
    try {
        const response = await axios.get(`${OPEN_METEO_URL}`, {
            params: {
                latitude: lat,
                longitude: lon,
                daily: 'temperature_2m_max,temperature_2m_min,weathercode',
                current_weather: true,
                timezone: 'auto',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

export const getCoordinates = async (location: string) => {
    try {
        const response = await axios.get(`${OPEN_METEO_GEOCODING_URL}`, {
            params: {
                name: location,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
        throw error;
    }
};
