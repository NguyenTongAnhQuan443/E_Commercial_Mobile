import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import config from '../config/config';
import { convertToCurrency } from '../models/util';

const SearchScreen = ({ route, navigation }) => {
    const { categoryId, categoryName } = route.params;
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = `${config.host}${config.endpoints.getProductByCategoryId}`;
                const response = await fetch(url + `${categoryId}`);
                const data = await response.json();
                setProducts(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Lỗi khi fetch dữ liệu sản phẩm:', error);
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [categoryId]);

    const handleAddToCart = (item) => {
        console.log(`Added to cart: ${item.name}`);
        // Logic thêm sản phẩm vào giỏ hàng có thể được thêm tại đây.
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.images[0]?.imageUri }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{convertToCurrency(item.price)}</Text>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back-outline" size={26} color="#333" onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>{categoryName}</Text>
            </View>
            <View style={styles.listContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />
                ) : (
                    <FlatList
                        data={products}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.flatListContent}
                        columnWrapperStyle={styles.columnWrapper}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F3F7' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerTitle: { fontSize: 20, fontWeight: '600', marginLeft: 10, color: '#333' },
    listContainer: { flex: 1, paddingHorizontal: 10, paddingVertical: 5 },
    loadingIndicator: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    card: {
        flex: 1,
        margin: 10,
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },
    productImage: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 10 },
    productName: { fontSize: 16, fontWeight: '500', color: '#333', textAlign: 'center', marginBottom: 5 },
    productPrice: { fontSize: 14, fontWeight: '600', color: '#4CAF50', marginBottom: 10 },
    addToCartButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    addToCartText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
    columnWrapper: { justifyContent: 'space-between' },
});

export default SearchScreen;
