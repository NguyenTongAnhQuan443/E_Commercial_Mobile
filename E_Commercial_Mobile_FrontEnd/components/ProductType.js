import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

import { Ionicons } from '@expo/vector-icons'

import catProducts from '../dataTest/CatProduct'

const ProductType = () => {
    return (
        <SafeAreaView style={{ flex: 1, paddingLeft: 10, paddingRight: 10, }}>

            {/* View - 1 */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Ionicons name='arrow-back-outline' size={26} />
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Đồ chơi thú cưng</Text>
                <Ionicons name='filter-outline' size={26} />
            </View>

            {/* View - 2 */}
            <View style={{ flex: 11 }}>

                <FlatList
                    data={catProducts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString() + "1"}
                    numColumns={2}
                    contentContainerStyle={{}}
                    style={{}}
                />
            </View>
        </SafeAreaView>
    )
}

export default ProductType

const renderItem = ({ item }) => (
    <View style={{ width: '45%', height: 250, borderRadius: 20, alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.5, borderColor: 'grey', paddingBottom: 10, paddingTop: 10, marginHorizontal: 10, marginBottom: 10 }}>

        {/* Image Product */}
        <View style={{ height: '50%', width: '85%' }}>
            <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%' }} resizeMode='center' />
        </View>

        {/* Name Product */}
        <View style={{ width: '95%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
            <Text style={{ fontSize: 16, textAlign: 'left', color: 'grey', paddingLeft: 10, paddingTop: 2 }}>1.2kg, Price</Text>
        </View>

        {/* Price -  Button Add*/}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.price}</Text>
            <TouchableOpacity>
                <Image source={require('../assets/icons/btnAdd.png')} style={{ width: 45, height: 45 }} />
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({})