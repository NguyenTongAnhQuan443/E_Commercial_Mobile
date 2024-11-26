import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reduxToolkit/slices/cartSlice';
import config from '../config/config';
import { convertToCurrency } from '../models/util';

const SearchScreen = ({ route, navigation }) => {
    const { categoryId, categoryName } = route.params;
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const { searchTerm } = route.params;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = '';
                if (searchTerm) {
                    // Nếu có searchTerm từ HomeScreen, sử dụng API filter theo tên sản phẩm
                    // url = `${config.host}/api/products/filter?name=${searchTerm}`;
                    url = `${config.host}${config.endpoints.filterProductsByName}?name=${searchTerm}`;
                } else if (categoryId) {
                    // Nếu có categoryId từ ExploreScreen, fetch sản phẩm theo categoryId
                    url = `${config.host}${config.endpoints.getProductByCategoryId}${categoryId}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                setProducts(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Lỗi khi fetch dữ liệu sản phẩm:', error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, searchTerm]); // Thêm searchTerm vào dependency

    // Hàm thêm sản phẩm vào giỏ hàng
    const handleAddToCart = (item) => {
        dispatch(addToCart({ product: item, quantity: 1, price: item.price }));
        Alert.alert('Thành công', 'Sản phẩm đã được thêm vào giỏ hàng');
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.images[0]?.imageUri }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{convertToCurrency(item.price)}</Text>
            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item)}
            >
                <Ionicons name="cart" size={24} color="#FFF" />
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
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    listContainer: {
        flex: 1,
        padding: 10,
    },
    card: {
        width: '45%',
        height: 250,
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#4CAF50',
        marginBottom: 10,
    },
    addToCartButton: {
        backgroundColor: '#4CAF50',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    loadingIndicator: {
        marginTop: 50,
    },
    flatListContent: {
        justifyContent: 'space-between',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});

export default SearchScreen;
