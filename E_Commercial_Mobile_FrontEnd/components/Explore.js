import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import config from '../config/config';
import SearchScreen from './SearchScreen';
const backgroundColors = ['#F0F4FF', '#FFEBEB', '#E9F9F1', '#FFF4E4', '#F7E9FF'];

const Explore = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${config.host}${config.endpoints.fetchCategories}`;
                const response = await fetch(url);
                const data = await response.json();
                setCategories(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderItem = ({ item }) => {
        const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
        return (
            <TouchableOpacity
                style={[styles.card, { backgroundColor: randomColor }]}
                onPress={() => navigation.navigate('SearchScreen', { categoryId: item.id, categoryName: item.name })} // Thêm dòng này để điều hướng
            >
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Khám phá sản phẩm cùng loại</Text>
                {/* <Ionicons name="search-outline" size={24} color="#6A6A6A" /> */}
            </View>
            <View style={styles.listContainer}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        numColumns={2}
                        contentContainerStyle={styles.flatListContent}
                        columnWrapperStyle={styles.flatListColumn}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#F0F0F0',
    },
    headerText: { fontSize: 24, fontWeight: '600', color: '#333' },
    listContainer: { flex: 1, padding: 10 },
    card: {
        flex: 1,
        height: 220,
        margin: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productImage: { width: 180, height: 150, resizeMode: 'contain', borderRadius: 20 },
    productName: {
        marginTop: 10,
        fontWeight: '500',
        fontSize: 14,
        textAlign: 'center',
        color: '#4A4A4A',
    },
    loadingText: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 20 },
});

export default Explore;
