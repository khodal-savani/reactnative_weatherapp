/**
 * @format
 */

// import 'react-native';
// import React from 'react';
// import App from '../App';

// // Note: import explicitly to use the types shipped with jest.
// import { it } from '@jest/globals';

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//     renderer.create(<App />);
// });
import { render, screen, waitFor } from '@testing-library/react-native';
import App from './../App';
import { getWeatherData } from './../src/services/weatherService';

// Mock the getWeatherData function
jest.mock('./../src/services/weatherService', () => ({
    getWeatherData: jest.fn(),
}));

describe('App Component', () => {
    it('fetches and displays weather data', async () => {
        // Mock the data returned by getWeatherData
        const mockData = {
            current_weather: {
                temperature: 20,
                weathercode: 1,
            },
            daily: {
                temperature_2m_max: [25, 27, 26],
                temperature_2m_min: [15, 17, 16],
                weathercode: [1, 2, 3],
                time: ['2024-09-01', '2024-09-02', '2024-09-03'],
            },
        };
        (getWeatherData as jest.Mock).mockResolvedValue(mockData);

        render(<App />);

        // Wait for the component to update
        await waitFor(() => {
            expect(screen.getByText('New York')).toBeTruthy();
            // Add more assertions based on your app's UI
        });
    });
});
