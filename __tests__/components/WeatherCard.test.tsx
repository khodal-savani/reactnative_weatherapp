// WeatherCard.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import getWeatherImage from './../../src/helpers/getWeatherImage';
import WeatherCard from './../../src/components/WeatherCard';

// Mock the getWeatherImage function
jest.mock('./../../src/helpers/getWeatherImage', () => jest.fn());

describe('WeatherCard', () => {
    beforeEach(() => {
        (getWeatherImage as jest.Mock).mockImplementation((weatherCode) => {
            return {
                image: `https://example.com/${weatherCode}.png`,
                description: `Description for ${weatherCode}`,
            };
        });
    });

    it('should render with given props', async () => {
        const forecast = [
            { day: 'Monday', maxTemp: 30, minTemp: 20, weatherCode: 'sunny' },
            { day: 'Tuesday', maxTemp: 28, minTemp: 18, weatherCode: 'cloudy' },
        ];

        const { getByText, findAllByText, getAllByText } = render(
            <WeatherCard
                location="New York"
                currentTemp={25}
                weatherCode="sunny"
                forecast={forecast}
            />
        );

        // Check if the location text is rendered
        expect(getByText('New York')).toBeTruthy();

        // Check if the current temperature is rendered
        expect(getByText('25°C')).toBeTruthy();

        // Check if the current weather image description is rendered
        const weatherDescriptions = await findAllByText(/Description for sunny/);
        expect(weatherDescriptions.length).toBeGreaterThanOrEqual(1); // Ensure there is at least one

        // Check if the forecast items are rendered correctly
        forecast.forEach(async (item) => {
            expect(getByText(item.day)).toBeTruthy();
            expect(getByText(`${Math.round(item.minTemp)} - ${Math.round(item.maxTemp)}°C`)).toBeTruthy();
            const forecastDescriptions = await findAllByText(new RegExp(`Description for ${item.weatherCode}`));
            expect(forecastDescriptions.length).toBeGreaterThanOrEqual(1); // Ensure there is at least one for each forecast
        });

        // Optionally, check if descriptions are unique
        const allDescriptions = getAllByText(/Description for/);
        expect(allDescriptions.length).toBe(forecast.length + 1); // +1 for the current weather description
    });
});
