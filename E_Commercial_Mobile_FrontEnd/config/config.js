import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';

const isSimulator = Platform.OS === 'ios' || Platform.OS === 'android';

const config = {
    host: !isSimulator ? 'http://localhost:8080' : 'http://192.168.100.135:8080',
    endpoints: {
        login: '/api/auth/login',
        signUp: '/api/auth/signup',
        register: '/api/auth/register',
        // ProductSlice
        fetchProducts: '/api/products',
        getProductById: '/api/products/',
        getProductByCategoryId: '/api/products/by-category/',
        getProductExclusiveOffer: '/api/products/exclusive-offer',
        getProductBestSeller: '/api/products/best-seller',
        // categorySlice
        fetchCategories: '/api/category',
        // deliverySlice
        fetchDeliveryMethods: '/api/delivery-method',
        // orderSlice
        createOrder: '/api/orders',
        // paymentSlice 
        fetchPaymentMethods: '/api/payment-method',
        // promotionSlice
        fetchPromotions: '/api/promotion',

    },
};

export default config;
