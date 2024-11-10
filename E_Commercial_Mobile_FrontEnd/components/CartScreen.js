import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, changeQuantity, decreaseQuantity } from '../reduxToolkit/cartSlice';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);

    // Set cart items
    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    // Calculate total
    useEffect(() => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });

        setTotal(total);
    }, [cartItems]);


    const renderCartItems = (item) => {
        return (
            <View key={item.id} style={styles.cartItem}>
                <View style={styles.cartItemImageContainer}>
                    <Image source={item.image} style={styles.cartItemImage} />
                </View>
                <View style={styles.cartItemDetails}>
                    <Text style={styles.cartItemTitle}>
                        {item.title}
                    </Text>
                    <Text style={styles.cartItemWeight}>
                        {item.weight}
                    </Text>
                    <View style={styles.cartItemQuantity}>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => dispatch(decreaseQuantity(item))}>
                            <Icon name='minus' size={20} color={'gray'} />
                        </TouchableOpacity>
                        <TextInput
                            value={item.quantity.toString()}
                            style={styles.quantityInput}
                            onChangeText={(text) => dispatch(changeQuantity({ id: item.id, text }))}
                            keyboardType='numeric'
                        />
                        <TouchableOpacity style={styles.quantityButton} onPress={() => dispatch(increaseQuantity(item))}>
                            <Icon name='plus' size={20} color={'#53b175'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cartItemPriceContainer}>
                    <View style={styles.cartItemPrice}>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => dispatch(removeFromCart(item))}>
                            <Icon name='x' size={20} color={'gray'} />
                        </TouchableOpacity>
                        <Text style={styles.cartItemPriceText}>
                            ${item.price}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Cart</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.divider} />
                {cartItems.length > 0 ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={cartItems}
                        renderItem={({ item }) => renderCartItems(item)}
                        keyExtractor={item => item.id.toString()}
                    />
                ) : (
                    <View style={styles.emptyCart}>
                        <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    </View>
                )}
                <View style={styles.divider} />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerText}>
                        Go to Checkout
                    </Text>
                    <Text style={styles.footerTotal}>
                        ${total.toFixed(2)}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        paddingVertical: 35,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    body: {
        flex: 1,
        width: '90%',
    },

    //  Cart Item
    cartItem: {
        flexDirection: 'row',
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
        paddingVertical: 30,
    },
    cartItemImageContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    cartItemImage: {
        width: 75,
        resizeMode: 'contain',
    },
    cartItemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    cartItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartItemWeight: {
        fontSize: 16,
        color: 'gray',
    },
    cartItemQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 15,
    },
    quantityButton: {
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    quantityInput: {
        marginHorizontal: 20,
        width: '10%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartItemPriceContainer: {
        justifyContent: 'center',
    },
    cartItemPrice: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    deleteButton: {
        padding: 5,
        marginBottom: 35,
    },
    cartItemPriceText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    // Button Footer
    footer: {
        width: '100%',
        padding: 20,
    },
    footerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 18,
        backgroundColor: '#53b175',
        borderRadius: 15,
    },
    footerText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        flex: 11,
        textAlign: 'center',
    },
    footerTotal: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#489E67',
        padding: 5,
        borderRadius: 5,
    },
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 18,
    },

});

export default CartScreen;