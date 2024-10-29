import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const HomeDashboard = () => {
    return (
        <SafeAreaView style={styles.container}>

            {/* View - 1 */}
            <View style={{ flex: 2 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{ width: '75%', backgroundColor: 'blue' }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Groceries</Text>
                    </View>

                    <View style={{ width: '25%', backgroundColor: 'green', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Image source={require('../assets/icons/Love 2.png')} />
                        <Image source={require('../assets/icons/Cart.png')} style={{ marginRight: 20 }} />
                    </View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '80%', height: '80%' }}>
                        <TextInput style={{ width: '100%', height: '100%', borderRadius: 30, paddingLeft: 40, fontSize: 14, backgroundColor: 'white' }} placeholder='Search Product' placeholderTextColor='grey'></TextInput>
                        <Image source={require('../assets/icons/Search.png')} style={{ position: 'absolute', left: 10, top: 14 }} />
                    </View>
                </View>


            </View>

            {/* View - 2 */}
            <View style={{ flex: 10, backgroundColor: 'yellow' }}>
                {/* <TextInput style={{ borderWidth: 2, }}></TextInput> */}
            </View>
        </SafeAreaView>
    )
}

export default HomeDashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#33907C'
    }
})