import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const items = [
        {
            id: 1,
            title: 'Organic Bananas',
            weight: '7pcs, Price',
            price: '4.99',
            description: 'Fresh and organic',
            image: require('../assets/banana.png'),
        },
        {
            id: 2,
            title: 'Red Apple',
            weight: '1kg, Price',
            price: '4.99',
            description: 'Apples are nutritious. Apples may be good for weight loss. apples may be good for your heart. As part of a healtful and varied diet.',
            image: require('../assets/apple.png'),
        },
        {
            id: 3,
            title: 'Organic Bananas',
            weight: '7pcs, Price',
            price: '4.99',
            description: 'Fresh and organic',
            image: require('../assets/banana.png'),
        },
        {
            id: 4,
            title: 'Organic Bananas',
            weight: '7pcs, Price',
            price: '4.99',
            description: 'Fresh and organic',
            image: require('../assets/banana.png'),
        },
        {
            id: 5,
            title: 'Red Apple',
            weight: '1kg, Price',
            price: '4.99',
            description: 'Apples are nutritious. Apples may be good for weight loss. apples may be good for your heart. As part of a healtful and varied diet.',
            image: require('../assets/apple.png'),
        },
        {
            id: 6,
            title: 'Organic Bananas',
            weight: '7pcs, Price',
            price: '4.99',
            description: 'Fresh and organic',
            image: require('../assets/banana.png'),
        },
        {
            id: 7,
            title: 'Organic Bananas',
            weight: '7pcs, Price',
            price: '4.99',
            description: 'Fresh and organic',
            image: require('../assets/banana.png'),
        },
        {
            id: 8,
            title: 'Red Apple',
            weight: '1kg, Price',
            price: '4.99',
            description: 'Apples are nutritious. Apples may be good for weight loss. apples may be good for your heart. As part of a healtful and varied diet.',
            image: require('../assets/apple.png'),
        },
        {
            id: 9,
            title: 'Organic Bananas',
            weight: '7pcs, Price',
            price: '4.99',
            description: 'Fresh and organic',
            image: require('../assets/banana.png'),
        },
    ];

    // Set cart items
    useEffect(() => {
        const cartItems = items.map(item => {
            return {
                ...item,
                quantity: 1,
            }
        });
        console.log(cartItems);

        setCartItems(cartItems);
    }, []);

    // Calculate total
    useEffect(() => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });

        setTotal(total);
    }, [cartItems]);

    // Increase quantity
    const handleIncrease = (id) => {
        const newCartItems = cartItems.map(item => {
            if(item.id === id && item.quantity < 10) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                }
            }
            return item;
        });

        setCartItems(newCartItems);
    }

    // Decrease quantity
    const handleDescrease = (id) => {
        const newCartItems = cartItems.map(item => {
            if(item.id === id && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                }
            }
            return item;
        });

        setCartItems(newCartItems);
    }

    // Change quantity
    const handleChangeQuantity = (id, text) => {
        const newCartItems = cartItems.map(item => {
            if(item.id === id && text !== '' && !isNaN(text) && parseInt(text) > 0 && parseInt(text) <= 10) {
                return {
                    ...item,
                    quantity: parseInt(text),
                }
            }
            return item;
        });

        setCartItems(newCartItems);
    }

    // Delete item
    const handleDelete = (id) => {
        const newCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(newCartItems);
    }

    

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
                        <TouchableOpacity style={styles.quantityButton} onPress={() => handleDescrease(item.id)}>
                            <Icon name='minus' size={20} color={'gray'} />
                        </TouchableOpacity>
                        <TextInput 
                            value={item.quantity.toString()}
                            style={styles.quantityInput}
                            onChangeText={(text) => handleChangeQuantity(item.id, text)}
                            keyboardType='numeric'
                        />
                        <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrease(item.id)}>
                            <Icon name='plus' size={20} color={'#53b175'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cartItemPriceContainer}>
                    <View style={styles.cartItemPrice}>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
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
                        renderItem={({item}) => renderCartItems(item)}
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
        fontSize: 20,
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