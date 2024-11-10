import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const OrderAcceptedScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* View - 1 */}
            <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/icons/OrderAccept.png')} style={{ marginRight: 40 }} resizeMode='contain' />
            </View>
            <View style={{ flex: 3 }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 10,
                }}>Your Order has been accepted</Text>
                <Text style={{
                    fontSize: 14,
                    color: 'gray',
                    textAlign: 'center',
                    marginBottom: 30,
                }}>
                    Your items have been placed and are on their way to being processed
                </Text>
            </View>
            <View style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: '35%', backgroundColor: '#53B175', width: '90%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white' }}>Track Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: '30%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>Back to home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default OrderAcceptedScreen;

const styles = StyleSheet.create({

});
