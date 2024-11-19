import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import favouriteData from '../dataTest/favouriteData';

const FavoritesScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Danh sách yêu thích</Text>
            </View>

            {/* List of Favorites */}
            <View style={styles.listContainer}>
                <FlatList
                    data={favouriteData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                />
            </View>

            {/* Add All To Cart Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add All To Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
            <Image
                source={{ uri: 'https://product.hstatic.net/200000863047/product/sku1_d11b1acc65b94413833c059372c06f60.png' }}
                style={styles.productImage}
                resizeMode="contain"
            />
        </View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
            <Text style={styles.productName}>Sprite Can</Text>
            <Text style={styles.productDetails}>2L / Price</Text>
        </View>

        {/* Price and Navigation */}
        <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>$1.50</Text>
            <TouchableOpacity>
                <Ionicons name="chevron-forward-outline" size={24} color="#888" />
            </TouchableOpacity>
        </View>
    </View>
);

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    header: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#F9F9F9',
    },
    footer: {
        height: 80,
        borderTopWidth: 0.5,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    addToCartButton: {
        backgroundColor: '#53B175',
        width: '90%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    imageContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: 50,
        height: 100,
    },
    detailsContainer: {
        width: '55%',
        paddingLeft: 15,
        justifyContent: 'center',
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    productDetails: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    priceContainer: {
        width: '25%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    productPrice: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
});
