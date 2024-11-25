import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import {
    removeFromCart,
    increaseQuantity,
    changeQuantity,
    decreaseQuantity,
} from '../reduxToolkit/slices/cartSlice';
import { convertToCurrency } from '../models/util';
import { CheckoutModal } from './Checkout-modal';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cartItems);
    const totalPrice = useSelector((state) => state.cart.totalPrices);

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    useEffect(() => {
        setTotal(totalPrice);
    }, [totalPrice]);

    const renderCartItems = ({ item }) => (
        <View style={styles.cartItem}>
            <Image
                source={{ uri: item.product.images[0].imageUri }}
                style={styles.cartItemImage}
            />
            <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemTitle}>{item.product.name}</Text>
                <Text style={styles.cartItemWeight}>{item.product.weight}</Text>
                <View style={styles.cartItemQuantity}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => dispatch(decreaseQuantity(item))}
                    >
                        <Icon name="minus" size={18} color="#444" />
                    </TouchableOpacity>
                    <TextInput
                        value={item.quantity.toString()}
                        style={styles.quantityInput}
                        onChangeText={(text) =>
                            dispatch(changeQuantity({ ...item, quantity: parseInt(text) }))
                        }
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => dispatch(increaseQuantity(item))}
                    >
                        <Icon name="plus" size={18} color="#53b175" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cartItemPriceContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => dispatch(removeFromCart(item))}
                >
                    <Icon name="x" size={20} color="#888" />
                </TouchableOpacity>
                <Text style={styles.cartItemPriceText}>
                    {convertToCurrency(item.price)}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Giỏ hàng của tôi</Text>
            </View>
            <View style={styles.body}>
                {cartItems.length > 0 ? (
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItems}
                        keyExtractor={(item) => item.product.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={styles.emptyCart}>
                        <Text style={styles.emptyCartText}>Giỏ hàng trống !!</Text>
                    </View>
                )}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => setIsCheckoutModalVisible(true)}
                >
                    <Text style={styles.footerText}>Đi đến thanh toán</Text>
                    <Text style={styles.footerTotal}>{convertToCurrency(total)}</Text>
                </TouchableOpacity>
            </View>
            <CheckoutModal
                isVisible={isCheckoutModalVisible}
                onClose={() => setIsCheckoutModalVisible(false)}
                initialTotalCost={total}
                items={cartItems}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    body: {
        flex: 1,
        padding: 10,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    cartItemImage: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    cartItemDetails: {
        flex: 1,
        marginHorizontal: 15,
    },
    cartItemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    cartItemWeight: {
        fontSize: 14,
        color: '#666',
    },
    cartItemQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    quantityButton: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    quantityInput: {
        width: 40,
        textAlign: 'center',
        fontSize: 14,
        marginHorizontal: 5,
    },
    cartItemPriceContainer: {
        alignItems: 'flex-end',
    },
    deleteButton: {
        marginBottom: 10,
    },
    cartItemPriceText: {
        fontSize: 16,
        fontWeight: '600',
    },
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 16,
        color: '#999',
    },
    footer: {
        padding: 15,
        backgroundColor: '#fff',
    },
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#53b175',
        padding: 15,
        borderRadius: 10,
    },
    footerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    footerTotal: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
});

export default CartScreen;
