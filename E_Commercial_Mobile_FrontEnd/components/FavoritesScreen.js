import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

import { Ionicons } from '@expo/vector-icons'
import favouriteData from '../dataTest/favouriteData'

const FavoritesScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* View - 1 */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Favorurite</Text>
            </View>

            {/* View - 2 */}
            <View style={{ flex: 9 }}>
                {/* FlatList */}
                <FlatList
                    data={favouriteData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                />
            </View>

            {/* View -  3*/}
            <View style={{ flex: 2, borderTopWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: '#53B175', width: '90%', height: '55%', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Thêm Vào Giỏ Hàng</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default FavoritesScreen

const renderItem = ({ item }) => (
    < View style={{ width: '100%', height: 140, flexDirection: 'row', borderBottomWidth: 0.5, marginBottom: 10 }}>

        <View style={{ width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: 'https://product.hstatic.net/200000863047/product/sku1_d11b1acc65b94413833c059372c06f60.png' }} style={{ width: '95%', height: '95%', borderRadius: 10 }} resizeMode='contain' e />
        </View>

        <View style={{ width: '40%', height: '100%', paddingLeft: 20, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Sprite Can</Text>
            <Text style={{ fontSize: 16, color: 'grey' }}>2L / Price</Text>
        </View>

        <View style={{ width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, paddingRight: 10 }}>50.000 đ</Text>
                <TouchableOpacity>
                    <Ionicons name='chevron-forward-outline' size={30} style={{ fontWeight: 'bold' }} />
                </TouchableOpacity>
            </View>
        </View>
    </View >
)
const styles = StyleSheet.create({})