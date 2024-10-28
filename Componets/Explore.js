import { View, Text, SafeAreaView, TextInput } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons'
const Explore = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            
            {/* Text tìm kiếm sản phẩm */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tìm kiếm sản phẩm</Text>
            </View>
            
            {/* TextInput tìm kiếm sản phẩm */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput style={{backgroundColor: '#F0F0F4', borderWidth: 1, height: 51, borderRadius: 10, width: '95%', paddingLeft: 30, fontSize: 16}} placeholder='Tên sản phẩm'/>
                <Ionicons name='search-outline' size={20} style={{position: 'absolute'}}/>  
            </View>
            <View style={{ flex: 10, backgroundColor: 'green' }}></View>
        </SafeAreaView>
    )
}

export default Explore