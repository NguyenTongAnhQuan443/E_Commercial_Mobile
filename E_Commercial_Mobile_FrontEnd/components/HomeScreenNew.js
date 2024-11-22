import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreenNew = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Icon name="location-outline" size={20} color="#333" />
                <Text style={styles.locationText}>FLEYPET - Bình thạnh - Hồ Chí</Text>
                <Icon name="notifications-outline" size={20} color="#333" style={styles.notificationIcon} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Icon name="search-outline" size={20} color="#888" />
                <TextInput style={styles.searchInput} placeholder="Search Store" />
            </View>

            {/* Banner */}
            <View style={styles.banner}>
                <Image
                    source={{
                        uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/3a1fb4169601075.644fdce41162b.jpg',
                    }}
                    style={styles.bannerImage}
                    resizeMode='repeat' />
                <Text style={styles.bannerText}>Fresh Vegetables</Text>
                <Text style={styles.bannerSubText}>Get Up To 40% OFF</Text>
            </View>

            <ScrollView>
                {/* Exclusive Offers */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Exclusive Offer</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productRow}>
                        <ProductCard
                            image="https://via.placeholder.com/100"
                            name="Organic Bananas"
                            price="$4.99"
                        />
                        <ProductCard
                            image="https://via.placeholder.com/100"
                            name="Red Apple"
                            price="$4.99"
                        />
                    </View>
                </View>

                {/* Best Selling */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Best Selling</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productRow}>
                        <ProductCard
                            image="https://via.placeholder.com/100"
                            name="Carrot"
                            price="$2.99"
                        />
                        <ProductCard
                            image="https://via.placeholder.com/100"
                            name="Broccoli"
                            price="$3.99"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const ProductCard = ({ image, name, price }) => (
    <View style={styles.productCard}>
        <Image source={{ uri: image }} style={styles.productImage} />
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productPrice}>{price}</Text>
        <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    locationText: {
        flex: 1,
        marginLeft: 5,
        fontSize: 16,
        color: '#333',
    },
    notificationIcon: {
        marginLeft: 'auto',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
    },
    banner: {
        margin: 15,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        backgroundColor: '#fff',
    },
    bannerImage: {
        width: '100%',
        height: 120,
    },
    bannerText: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    bannerSubText: {
        position: 'absolute',
        top: 35,
        left: 10,
        fontSize: 14,
        color: '#fff',
    },
    section: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    seeAllText: {
        fontSize: 14,
        color: '#ff6347',
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    addButton: {
        width: 30,
        height: 30,
        backgroundColor: '#ff6347',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
});

export default HomeScreenNew;
