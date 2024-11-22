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
    console.log(bestSeller);
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
        dispatch(addToCart({ product: item, quantity: 1, price: item.price }));
        Alert.alert('Success', 'Item added to cart');
    };

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
        );
    };

    return (
        <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <View style={styles.locationContainer}>
                        <Image source={require('../assets/images/cat.png')} style={styles.logoImage} />
                        <Text style={styles.locationText}>FLEYPET</Text>
                    </View>
                </View>
                <View style={styles.searchContainer}>
                    <Icon name='search' size={20} color={'black'} />
                    <TextInput
                        placeholder='Search Store'
                        style={styles.searchInput}
                    />
                </View>
                {/* Dynamic Banner */}
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
                            <Image key={index} source={{ uri: url }} style={styles.bannerImage} resizeMode='repeat' />
                        ))}
                    </Swiper>
                </View>
                {/* Other sections */}
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Khuyến mãi độc quyền</Text>
                    <Text style={styles.seeAllText}>Tất cả</Text>
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
                    <Text style={styles.labelText}>Best Selling</Text>
                    <Text style={styles.seeAllText}>Tất cả</Text>
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
                    <Text style={styles.labelText}>Groceries</Text>
                    <Text style={styles.seeAllText}>Tất cả</Text>
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
};


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
        width: 64,
        height: 64,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationText: {
        marginLeft: 5,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#53B175'
    },
    // Search
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        width: '90%',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 10
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

    // Banner new
    swiperContainer: {
        height: 150,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'contain',
    },
});

export default ManageTaskScreen;