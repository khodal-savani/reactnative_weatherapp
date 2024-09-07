import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import WeatherSearch from '../../src/components/WeatherSearch';
import { getCoordinates } from '../../src/services/weatherService';

// Mock the getCoordinates function
jest.mock('./../../src/services/weatherService', () => ({
    getCoordinates: jest.fn(),
}));

describe('WeatherSearch', () => {
    const mockOnLocationSelected = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(
            <WeatherSearch onLocationSelected={mockOnLocationSelected} />
        );
        expect(getByPlaceholderText('Search for a location')).toBeTruthy();
        expect(getByText('Search')).toBeTruthy();
    });

    it('calls getCoordinates and updates results on search', async () => {
        // Mock the API response
        (getCoordinates as jest.Mock).mockResolvedValueOnce({
            results: [
                { id: 1, name: 'Test Location', country: 'Test Country', latitude: 0, longitude: 0 },
            ],
        });

        const { getByPlaceholderText, getByText } = render(
            <WeatherSearch onLocationSelected={mockOnLocationSelected} />
        );

        // Simulate typing in the search input
        fireEvent.changeText(getByPlaceholderText('Search for a location'), 'Test Query');

        // Simulate pressing the search button
        fireEvent.press(getByText('Search'));

        // Wait for results to be updated
        await waitFor(() => {
            expect(getByText('Test Location, Test Country')).toBeTruthy();
        });
    });

    it('calls onLocationSelected when a result is pressed', async () => {
        (getCoordinates as jest.Mock).mockResolvedValueOnce({
            results: [
                { id: 1, name: 'Test Location', country: 'Test Country', latitude: 0, longitude: 0 },
            ],
        });

        const { getByPlaceholderText, getByText } = render(
            <WeatherSearch onLocationSelected={mockOnLocationSelected} />
        );

        fireEvent.changeText(getByPlaceholderText('Search for a location'), 'Test Query');
        fireEvent.press(getByText('Search'));

        // Wait for results to be updated
        await waitFor(() => {
            fireEvent.press(getByText('Test Location, Test Country'));
        });

        expect(mockOnLocationSelected).toHaveBeenCalledWith(0, 0, 'Test Location');
    });
});
