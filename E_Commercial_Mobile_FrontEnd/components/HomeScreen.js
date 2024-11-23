import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import { addToCart } from '../reduxToolkit/slices/cartSlice';
import { fetchProducts, getProductBestSeller, getProductExclusiveOffer } from '../reduxToolkit/slices/productSlice';

// Banner
const BANNER_IMAGES = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/3a1fb4169601075.644fdce41162b.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/3ff3e4169601075.6450bfb338386.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/2027a2169601075.644fdce4171a6.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/5517dc169601075.6450bfb3377b9.jpg',
];

// Hàm Định Dạng Tiền Tệ
const formatCurrencyVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const ManageTaskScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const bestSeller = useSelector(state => state.product.productBestSeller);
    const exclusiveOffer = useSelector(state => state.product.productExclusiveOffer);

    const [expandedSections, setExpandedSections] = useState({
        exclusiveOffer: false,
        bestSeller: false,
        groceries: false,
    });

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(getProductBestSeller());
        dispatch(getProductExclusiveOffer());
    }, []);

    const handleAddToCart = (item) => {
        dispatch(addToCart({ product: item, quantity: 1, price: item.price }));
        Alert.alert('Thành công', 'Sản phẩm đã được thêm vào giỏ hàng');
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.itemImageContainer}
                onPress={() => navigation.navigate('ProductDetails', { item })}
            >
                <Image source={{ uri: item.images[0]?.imageUri }} style={styles.itemImage} resizeMode='contain' />
            </TouchableOpacity>
            <View style={styles.itemDetailContainer}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                    {item.name}
                </Text>
                <View style={styles.itemPriceContainer}>
                    <Text style={styles.itemPrice}>{formatCurrencyVND(item.price)}</Text>
                    <TouchableOpacity
                        style={styles.itemButton}
                        onPress={() => handleAddToCart(item)}
                    >
                        <Icon name="plus" size={17} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderSection = (title, dataKey, data) => (
        <View>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>{title}</Text>
                <TouchableOpacity
                    onPress={() =>
                        setExpandedSections((prev) => ({
                            ...prev,
                            [dataKey]: !prev[dataKey],
                        }))
                    }
                >
                    <Text style={styles.seeAllText}>
                        {expandedSections[dataKey] ? 'Thu gọn' : 'Tất cả'}
                    </Text>
                </TouchableOpacity>
            </View>
            {expandedSections[dataKey] ? (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    key={2}
                    numColumns={2}
                    contentContainerStyle={styles.flatListContainer}
                />
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.itemListContainer}
                />
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[]}
                ListHeaderComponent={() => (
                    <View>
                        {/* Header */}
                        <View style={styles.logoContainer}>
                            <View style={styles.locationContainer}>
                                <Image source={require('../assets/images/cat.png')} style={styles.logoImage} />
                                <Text style={styles.locationText}>FLEYPET</Text>
                            </View>
                        </View>

                        {/* Search */}
                        <View style={styles.searchContainer}>
                            <Icon name="search" size={20} color={'black'} />
                            <TextInput
                                placeholder="Search Store"
                                style={styles.searchInput}
                            />
                        </View>

                        {/* Banner Carousel */}
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
                                    <Image
                                        key={index}
                                        source={{ uri: url }}
                                        style={styles.bannerImage}
                                    />
                                ))}
                            </Swiper>
                        </View>

                        {/* Sections */}
                        {renderSection('Khuyến mãi độc quyền', 'exclusiveOffer', exclusiveOffer)}
                        {renderSection('Best Selling', 'bestSeller', bestSeller)}
                        {renderSection('Groceries', 'groceries', bestSeller)}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        color: '#53B175',
    },
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
        marginBottom: 10,
        alignSelf: 'center',
    },
    searchInput: {
        width: '90%',
        marginLeft: 10,
        fontSize: 16,
        color: 'gray',
    },
    bannerContainer: {
        width: '90%',
        height: 150,
        marginTop: 10,
        alignSelf: 'center',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
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
    itemListContainer: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    flatListContainer: {
        paddingHorizontal: 10,
    },
    // itemContainer: {
    //     flex: 1,
    //     margin: 5,
    //     backgroundColor: '#fff',
    //     borderRadius: 10,
    //     padding: 10,
    //     borderWidth: 1,
    //     borderColor: '#f0f0f0',
    // },
    itemContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        width: 180,
        height: 260,
    },
    itemImageContainer: {
        width: '100%',
        height: 150,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    itemDetailContainer: {
        marginTop: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 20, // Khoảng cách dòng giữa các dòng
        textAlign: 'center', // Canh giữa văn bản
    },
    itemPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#53b175'
    },
    itemButton: {
        backgroundColor: '#53b175',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
    },
    swiperContainer: {
        height: 150,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover',
    },
});

export default ManageTaskScreen;
