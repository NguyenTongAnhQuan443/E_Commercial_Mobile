import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

const SignUp = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* View  - 1  */}
            <View style={{ flex: 2 }}>

                {/* View - Welcome */}
                <View style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Welcome to tradly</Text>
                </View>

                {/* View - Text Login */}
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Signup to your account</Text>
                </View>

            </View>

            {/* View - 2 */}
            <View style={{ flex: 5 }}>

                {/* View - Input  */}
                <View style={{ flex: 4, justifyContent: 'space-around', alignItems: 'center' }}>
                    <TextInput style={{ borderWidth: 1, width: '85%', height: '15%', borderRadius: 30, borderColor: 'white', paddingLeft: 20, fontSize: 18, color: 'white' }} placeholder='First Name' placeholderTextColor='white'></TextInput>
                    <TextInput style={{ borderWidth: 1, width: '85%', height: '15%', borderRadius: 30, borderColor: 'white', paddingLeft: 20, fontSize: 18, color: 'white' }} placeholder='Last Name' placeholderTextColor='white' ></TextInput>
                    <TextInput style={{ borderWidth: 1, width: '85%', height: '15%', borderRadius: 30, borderColor: 'white', paddingLeft: 20, fontSize: 18, color: 'white' }} placeholder='Email/Mobile Number' placeholderTextColor='white' ></TextInput>
                    <TextInput style={{ borderWidth: 1, width: '85%', height: '15%', borderRadius: 30, borderColor: 'white', paddingLeft: 20, fontSize: 18, color: 'white' }} placeholder='Password' placeholderTextColor='white' ></TextInput>
                    <TextInput style={{ borderWidth: 1, width: '85%', height: '15%', borderRadius: 30, borderColor: 'white', paddingLeft: 20, fontSize: 18, color: 'white' }} placeholder='Re-enter Password' placeholderTextColor='white' ></TextInput>
                </View>

                {/* Button - Create */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '90%', height: '55%', backgroundColor: 'white', borderRadius: 20 }}>
                        <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#33907C' }}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* View - SIgn in */}
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Have an account ?</Text>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#33907C'
    }
})