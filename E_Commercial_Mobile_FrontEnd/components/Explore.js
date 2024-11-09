import { View, Text, TextInput, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

import { Ionicons } from '@expo/vector-icons'

// Import data test
import productsData from '../dataTest/ProductsData'

// Danh sách màu background cố định cho product
const backgroundColors = ['#EEF7F1', '#FFFAF0', '#F0F8FF', '#FFF0F5', '#E6E6FA', '#FAFAD2', '#FEF6ED', '#FDE8E4', '#F4EBF7', '#FEF8E5', '#EDF7FC', '#EAE7FC', '#F0DAE3'];

const Explore = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            {/* Text tìm kiếm sản phẩm */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tìm kiếm sản phẩm</Text>
            </View>

            {/* TextInput tìm kiếm sản phẩm */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput style={{ backgroundColor: '#F0F0F4', borderWidth: 0.5, height: 51, borderRadius: 20, width: '95%', paddingLeft: 40, fontSize: 16 }} placeholder='Tìm sản phẩm' />
                <Ionicons name='search-outline' size={20} style={{ position: 'absolute', left: 20 }} />
            </View>

            {/* View - 3 */}
            <View style={{ flex: 10 }}>
                <FlatList
                    data={productsData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    numColumns={2}
                    contentContainerStyle={{ paddingTop: 10 }}
                    columnWrapperStyle={{ justifyContent: 'space-around', paddingBottom: 20 }}
                />

            </View>
        </SafeAreaView>
    )
}

const renderItem = ({ item }) => {
    const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

    return (
        <View style={{ width: '45%', height: 190, backgroundColor: randomColor, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
            <Image source={{ uri: item.image_url }} style={{ width: 100, height: 90 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold', maxWidth: 150, textAlign: 'center', paddingTop: 10 }}>{item.name}</Text>
        </View>
    );
}

export default Explore