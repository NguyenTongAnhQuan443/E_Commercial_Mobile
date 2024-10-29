import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'


const Login = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* View  - 1  */}
            <View style={{ flex: 2, backgroundColor: '#33907C' }}>

                {/* View - Welcome */}
                <View style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Welcome to tradly</Text>
                </View>

                {/* View - Text Login */}
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Login to your account</Text>
                </View>

            </View>

            {/* View - 2 */}
            <View style={{ flex: 3 }}>

                {/* View - Input Username - Password */}
                <View style={{ flex: 2, justifyContent: 'space-around', alignItems: 'center' }}>
                    <TextInput style={{ borderWidth: 1, width: '85%', height: '35%', borderRadius: 30, borderColor: 'white', paddingLeft: 20, fontSize: 18 }} placeholder='Email/Mobile Number' placeholderTextColor='white'></TextInput>
                    <TextInput style={{ borderWidth: 1, width: '85%', height: '35%', borderRadius: 30, borderColor: 'white', paddingLeft: 20, fontSize: 18 }} placeholder='Password' placeholderTextColor='white' ></TextInput>
                </View>

                {/* Button - Login */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '90%', height: '70%', backgroundColor: 'white', borderRadius: 20 }}>
                        <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#33907C' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Text - Forgot Pass - Sign up */}
                <View style={{ flex: 2, justifyContent: 'space-around', alignItems: 'center' }}>

                    {/* Text  - Forgot Pass */}
                    <Text style={{ fontSize: 18, color: 'white' }}>Forgot your password?</Text>

                    {/* Text - Sign up */}
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Don’t have an account?</Text>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* View - Trống */}
                <View style={{ flex: 1 }}></View>
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#33907C'
    }
})