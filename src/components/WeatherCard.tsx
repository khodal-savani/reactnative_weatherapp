import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import getWeatherImage from '../helpers/getWeatherImage';

interface WeatherCardProps {
    location: string;
    currentTemp: number;
    weatherCode: string;
    forecast: { day: string; maxTemp: number; weatherCode: string; minTemp: number }[];
}

const WeatherCard: React.FC<WeatherCardProps> = ({ location, currentTemp, weatherCode, forecast }) => {
    const currentWeatherImage = getWeatherImage(weatherCode);

    return (
        <View style={styles.container}>
            <Text style={styles.location}>{location}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.temperature}>{currentTemp}°C</Text>
                <Image source={{ uri: currentWeatherImage.image }} style={styles.weatherImage} />
                <Text style={styles.description}>{currentWeatherImage.description}</Text>
            </View>

            <FlatList
                data={forecast}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    const forecastImage = getWeatherImage(item.weatherCode);
                    return (
                        <View style={styles.forecastItem}>
                            <Text style={styles.day}>{item.day}</Text>
                            <Text style={styles.maxTemp}>{Math.round(item.minTemp)} - {Math.round(item.maxTemp)}°C</Text>
                            <Image source={{ uri: forecastImage.image }} style={styles.forecastImage} />
                            <Text style={styles.description}>{forecastImage.description}</Text>
                        </View>
                    );
                }}
                horizontal={true} // Scroll horizontally
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    location: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    temperature: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    weatherImage: {
        width: 100,
        height: 100,
    },
    description: {
        fontSize: 18,
        color: '#666',
    },
    forecastItem: {
        alignItems: 'center',
        marginRight: 20,
    },
    day: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    maxTemp: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    forecastImage: {
        width: 50,
        height: 50,
    },
});

export default WeatherCard;
