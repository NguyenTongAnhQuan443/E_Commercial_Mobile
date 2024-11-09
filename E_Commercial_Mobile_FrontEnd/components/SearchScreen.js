import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons'

import catProducts from '../dataTest/CatProduct'

const SearchScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, paddingLeft: 10, paddingRight: 10, }}>

            {/* View - 1 */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Ionicons name='arrow-back-outline' size={28} />
                <View style={{ width: '80%', height: 45 }}>
                    <TextInput style={{ borderWidth: 0.5, height: '100%', width: '100%', borderRadius: 10, backgroundColor: '#F2F3F2', paddingLeft: 40 }} placeholder='Tên sản phẩm' />
                    <Ionicons name='search-outline' size={22} style={{ position: 'absolute', left: 10, top: 10 }} />
                    <Ionicons name='close-outline' size={22} style={{ position: 'absolute', right: 20, top: 10 }} />
                </View>
                <Ionicons name='filter-outline' size={28} />
            </View>

            {/* View - 2 */}
            <View style={{ flex: 11, marginTop: 10 }}>

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
export default SearchScreen

const renderItem = ({ item }) => (
    <View style={{ width: '45%', height: 250, borderRadius: 20, alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: 'grey', paddingBottom: 10, paddingTop: 10, marginHorizontal: 10, marginBottom: 10 }}>

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
