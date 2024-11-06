import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useDispatch } from 'react-redux';
import { addToCart } from '../reduxTollkit/cartSlice';

const ManageTaskScreen = () => {
    const items = [
        {
            id: 1,
            title: 'Organic Bananas',
            weight: '7pcs, Price',
            price: 4.99,
            description: 'Fresh and organic',
            image: require('../assets/banana.png'),
        },
        {
            id: 2,
            title: 'Red Apple',
            weight: '1kg, Price',
            price: 4.99,
            description: 'Apples are nutritious. Apples may be good for weight loss. apples may be good for your heart. As part of a healtful and varied diet.',
            image: require('../assets/apple.png'),
        },
        {
            id: 3,
            title: 'Organic Bananas',
            weight: '7pcs, Price',
            price: 4.99,
            description: 'Fresh and organic',
            image: require('../assets/banana.png'),
        },
    ];

    const categories = [
        {
            id: 1,
            title: 'Pulses',
            image: require('../assets/pulses.png'),
            backgroundColor: '#fef1e4',
        },
        {
            id: 2,
            title: 'Rice',
            image: require('../assets/rice.png'),
            backgroundColor: '#e5f3ea',
        },
        {
            id: 3,
            title: 'Rice',
            image: require('../assets/rice.png'),
            backgroundColor: '#e5f3ea',
        },
    ];

    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
        Alert.alert('Success', 'Item added to cart');
    }

    const renderItem = (item, index) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View style={styles.itemImageContainer}>
                    <Image source={item.image} style={styles.itemImage} />
                </View>
                <View style={styles.itemDetailContainer}>
                    <Text style={styles.itemTitle}>
                        {item.title}
                    </Text>
                    <Text style={styles.itemWeight}>
                        {item.weight}
                    </Text>
                    <View style={styles.itemPriceContainer}>
                        <Text style={styles.itemPrice}>
                            {item.price}
                        </Text>
                        <TouchableOpacity style={styles.itemButton} onPress={() => handleAddToCart(item)}>
                            <Text style={styles.itemButtonText}>
                                <Icon name='plus' size={17} color={'white'} />
                            </Text> 
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={styles.scrollViewContainer}
                showsVerticalScrollIndicator={false}
           >
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/logo.png')} style={styles.logoImage} />
                    <View style={styles.locationContainer}>
                        <Icon name='map-pin' size={20} color={'black'} />
                        <Text style={styles.locationText}>
                            HCM, Vietnam
                        </Text>
                    </View>
                </View>
                <View style={styles.searchContainer}>
                    <Icon name='search' size={20} color={'black'} />
                    <TextInput 
                        placeholder='Search Store'
                        style={styles.searchInput}
                    />
                </View>
                <View style={styles.bannerContainer}>
                    <Image source={require('../assets/banner.png')} style={styles.bannerImage} />
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>
                        Exclusive Offer
                    </Text>
                    <Text style={styles.seeAllText}>
                        See all
                    </Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.itemListContainer}
                >
                    {
                        items.map((item, index) => (
                            renderItem(item, index)
                        ))
                    }
                </ScrollView>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>
                        Best Selling
                    </Text>
                    <Text style={styles.seeAllText}>
                        See all
                    </Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.itemListContainer}
                >
                    {
                        items.map((item, index) => (
                            renderItem(item, index)
                        ))
                    }
                </ScrollView>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>
                        Groceries
                    </Text>
                    <Text style={styles.seeAllText}>
                        See all
                    </Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryListContainer}
                >
                    {
                        categories.map((category, index) => (
                            <View key={index} style={[styles.categoryContainer, {backgroundColor: category.backgroundColor}]} >
                                <Image source={category.image} style={styles.categoryImage} />
                                <Text style={styles.categoryText}>
                                    {category.title}
                                </Text>
                            </View>
                        ))
                    }
                </ScrollView>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.itemListContainer}
                >
                    {
                        items.map((item, index) => (
                            renderItem(item, index)
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContainer: {
        flex: 1,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    logoImage: {
        width: 30,
        height: 30,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationText: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Search
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        width: '90%',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 20,
    },
    searchInput: {
        width: '90%',
        marginLeft: 10,
        fontSize: 16,
        color: 'gray',
    },

    // Banner
    bannerContainer: {
        width: '90%',
        height: 150,
        marginTop: 10,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'contain',
    },

    // Label
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginTop: 15,
    },
    labelText: {
        fontSize: 24,
        fontWeight: '600',
    },
    seeAllText: {
        fontSize: 16,
        color: '#53b175',
        fontWeight: '400',
    },

    // Item List
    itemListContainer: {
        marginTop: 20,
        width: '90%',
    },
    itemContainer: {
        width: '38%',
        height: 250,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginRight: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    itemImageContainer: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        // overflow: 'hidden',
        padding: 20,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'contain',
    },
    itemDetailContainer: {
        marginLeft: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    itemWeight: {
        fontSize: 16,
        color: 'gray',
    },
    itemPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: '600',
    },
    itemButton: {
        width: 40,
        height: 40,
        backgroundColor: '#53b175',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        padding: 15,
    },
    itemButtonText: {
        color: 'white',
        fontSize: 16,
    },

    // Category List
    categoryListContainer: {
        marginTop: 20,
        width: '90%',
    },
    categoryContainer: {
        width: '50%',
        height: 120,
        borderRadius: 15,
        marginRight: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    categoryImage: {
        width: 70,
        height: 70,
        marginLeft: 10,
    },
    categoryText: {
        fontSize: 25,
        fontWeight: '400',
        marginTop: 5,
        marginLeft: 10,
    },




});

export default ManageTaskScreen;