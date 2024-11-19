import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addToCart } from '../reduxToolkit/slices/cartSlice';
import { fetchProducts, getProductById, getProductBestSeller, getProductByCategoryId, getProductExclusiveOffer } from '../reduxToolkit/slices/productSlice';
import { fetchCategories } from '../reduxToolkit/slices/categorySlice';
import { convertToCurrency } from '../models/util';

const ManageTaskScreen = ({ navigation }) => {

    const items = useSelector(state => state.product.products);
    const categories = useSelector(state => state.category.categories);
    const bestSeller = useSelector(state => state.product.productBestSeller);
    const exclusiveOffer = useSelector(state => state.product.productExclusiveOffer);
    const itemByCategory = useSelector(state => state.product.productByCategory);
    const [initItemByCategory, setInitItemByCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const colors = ['#fef1e4', '#e5f3ea', '#FDE8E4', '#F4EBF7'];

    const categoriesWithColor = categories.map((category, index) => ({
        ...category,
        backgroundColor: colors[index % colors.length],
    }));

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(getProductBestSeller());
        dispatch(getProductExclusiveOffer());
        dispatch(fetchCategories());
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            dispatch(getProductByCategoryId(selectedCategory.id));
            setInitItemByCategory(itemByCategory);
        } else {
            setInitItemByCategory(items);
        }
    }, [selectedCategory, items]);

    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
        dispatch(addToCart({ ...item, quantity: 1 }));
        Alert.alert('Success', 'Item added to cart');
    }

    const renderItem = (item, index) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <TouchableOpacity style={styles.itemImageContainer} onPress={() => navigation.navigate('ProductDetails', { item })}>
                    <Image source={{ uri: item.images[0].imageUri }} style={styles.itemImage} />
                </TouchableOpacity>
                <View style={styles.itemDetailContainer}>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                        {item.name}
                    </Text>
                    <Text style={styles.itemWeight}>
                        {item.weight}
                    </Text>
                    <View style={styles.itemPriceContainer}>
                        <Text style={styles.itemPrice}>
                            {convertToCurrency(item.price)}
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
                {/* Exclusive Offer */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.itemListContainer}
                >
                    {
                        exclusiveOffer.map((item, index) => (
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
                {/* Best Seller */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.itemListContainer}
                >
                    {
                        bestSeller.map((item, index) => (
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
                        categoriesWithColor.map((category, index) => (
                            <TouchableOpacity key={category.id} style={[styles.categoryContainer, { backgroundColor: category.backgroundColor }]} onPress={() => setSelectedCategory(category)}>
                                <Image source={{ uri: category.image }} style={styles.categoryImage} />
                                <Text style={styles.categoryText}>
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.itemListContainer}
                >
                    {
                        initItemByCategory.map((item, index) => (
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
        maxWidth: 200,
        maxHeight: 300,
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
        maxWidth: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'contain',
    },
    itemDetailContainer: {
        marginLeft: 10,
    },
    itemTitle: {
        overflow: 'hidden',
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
        maxWidth: '30%',
        height: 100,
        borderRadius: 15,
        marginRight: 10,
        padding: 8,
        paddingEnd: 15,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    categoryImage: {
        width: 60,
        height: 60,
        marginLeft: 10,
    },
    categoryText: {
        fontSize: 20,
        fontWeight: '400',
        marginTop: 5,
        marginLeft: 10,
    },




});

export default ManageTaskScreen;