import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const BANNER_IMAGES = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/3a1fb4169601075.644fdce41162b.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/3ff3e4169601075.6450bfb338386.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/2027a2169601075.644fdce4171a6.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/5517dc169601075.6450bfb3377b9.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/2027a2169601075.644fdce4171a6.jpg',
    'https://png.pngtree.com/png-clipart/20210418/original/pngtree-blue-halo-doodle-pet-adoption-template-png-image_6245369.png',
    'https://png.pngtree.com/png-clipart/20210418/original/pngtree-dog-creative-doodle-pet-adoption-template-png-image_6245189.png',
];


const HomeScreenNew = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.logoContainer}>
                <View style={styles.locationContainer}>
                    <Image source={require('../assets/images/cat.png')} style={styles.logoImage} />
                    <Text style={styles.locationText}>FLEYPET</Text>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Icon name="search-outline" size={20} color="#888" />
                <TextInput style={styles.searchInput} placeholder="Tìm kiếm sản phẩm" />
            </View>

            {/* Banner */}
            <View style={styles.bannerContainer}>
                <Swiper
                    autoplay
                    autoplayTimeout={4}
                    showsPagination={true}
                    dotStyle={{ backgroundColor: 'lightgray', width: 8, height: 8 }}
                    activeDotStyle={{ backgroundColor: '#53B175', width: 8, height: 8 }}
                    containerStyle={styles.swiperContainer}
                >
                    {BANNER_IMAGES.map((url, index) => (
                        <Image key={index} source={{ uri: url }} style={styles.bannerImage} resizeMode='cover' />
                    ))}
                </Swiper>
            </View>

            <ScrollView>

                {/* Best Selling */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Best Selling</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>Tất cả</Text>
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

                {/* Exclusive Offers */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Exclusive Offer</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>Tất cả</Text>
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
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 20,
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
        fontSize: 16,
        color: '#53b175',
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
    // Banner new
    bannerContainer: {
        width: '90%',
        height: 150,
        marginTop: 10,
        alignSelf: 'center',
    },
    swiperContainer: {
        height: 150,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    logoImage: {
        width: 64,
        height: 64,
    },
    locationText: {
        marginLeft: 5,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#53B175'
    },
});

export default HomeScreenNew;
