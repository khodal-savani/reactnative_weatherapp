import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getWeatherData, getCoordinates } from '../../src/services/weatherService'; // Adjust path if needed

const mock = new MockAdapter(axios);

const weatherResponse = {
    daily: {
        temperature_2m_max: [30, 31, 29],
        temperature_2m_min: [20, 21, 19],
        weathercode: [1, 2, 3],
    },
    current_weather: {
        temperature: 25,
        weathercode: 1,
    },
};

const coordinatesResponse = {
    results: [
        {
            latitude: 37.7749,
            longitude: -122.4194,
            name: 'San Francisco',
        },
    ],
};

describe('weatherService', () => {
    afterEach(() => {
        mock.reset(); // Reset mock after each test
    });

    it('should fetch weather data successfully', async () => {
        mock.onGet('https://api.open-meteo.com/v1/forecast').reply(200, weatherResponse);

        const result = await getWeatherData(37.7749, -122.4194);
        expect(result).toEqual(weatherResponse);
    });

    it('should handle errors while fetching weather data', async () => {
        mock.onGet('https://api.open-meteo.com/v1/forecast').reply(500);

        await expect(getWeatherData(37.7749, -122.4194)).rejects.toThrow();
    });

    it('should fetch coordinates successfully', async () => {
        mock.onGet('https://geocoding-api.open-meteo.com/v1/search').reply(200, coordinatesResponse);

        const result = await getCoordinates('San Francisco');
        expect(result).toEqual(coordinatesResponse);
    });

    it('should handle errors while fetching coordinates', async () => {
        mock.onGet('https://geocoding-api.open-meteo.com/v1/search').reply(500);

        await expect(getCoordinates('San Francisco')).rejects.toThrow();
    });
});
