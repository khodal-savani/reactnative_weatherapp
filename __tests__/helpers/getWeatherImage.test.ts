import getWeatherImage from "../../src/helpers/getWeatherImage";

describe('getWeatherImage', () => {
    it('should return correct image and description for known weather codes (e.g., code "0")', () => {
        const result = getWeatherImage('0');
        expect(result).toEqual({
            description: 'Sunny',
            image: 'http://openweathermap.org/img/wn/01d@2x.png',
        });
    });

    it('should return correct image and description for night time (code "0")', () => {
        const result = getWeatherImage('0');
        expect(result).toEqual({
            description: 'Sunny',
            image: 'http://openweathermap.org/img/wn/01d@2x.png',
        });
    });

    it('should return a fallback for unknown weather codes', () => {
        const result = getWeatherImage('unknown_code');
        expect(result).toEqual({
            description: 'Unknown',
            image: '',
        });
    });

    it('should return correct image and description for weather code "1"', () => {
        const result = getWeatherImage('1');
        expect(result).toEqual({
            description: 'Mainly Sunny',
            image: 'http://openweathermap.org/img/wn/01d@2x.png',
        });
    });

    it('should return correct image and description for weather code "3"', () => {
        const result = getWeatherImage('3');
        expect(result).toEqual({
            description: 'Cloudy',
            image: 'http://openweathermap.org/img/wn/03d@2x.png',
        });
    });
});
