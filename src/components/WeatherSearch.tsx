import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { getCoordinates } from '../services/weatherService';

interface WeatherSearchProps {
    onLocationSelected: (lat: number, lon: number, locationName: string) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onLocationSelected }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    const searchLocation = async () => {
        try {
            const data = await getCoordinates(query);
            setResults(data.results);
        } catch (error) {
            console.error('Error searching for location:', error);
        }
    };

    return (
        <View>
            <TextInput placeholder="Search for a location" value={query} onChangeText={setQuery} />
            <Button title="Search" onPress={searchLocation} />

            <FlatList
                data={results}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text onPress={() => onLocationSelected(item.latitude, item.longitude, item.name)}>
                        {item.name}, {item.country}
                    </Text>
                )}
            />
        </View>
    );
};

export default WeatherSearch;
