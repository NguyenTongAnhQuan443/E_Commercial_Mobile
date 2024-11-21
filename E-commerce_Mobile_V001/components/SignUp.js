import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Welcome to FLEYPET</Text>
                    <Text style={styles.subHeaderText}>Đăng ký tài khoản</Text>
                </View>

                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder="Họ" placeholderTextColor="#7f8c8d" />
                    <TextInput style={styles.input} placeholder="Tên" placeholderTextColor="#7f8c8d" />
                    <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#7f8c8d" />
                    <TextInput style={styles.input} placeholder="Mật khẩu" placeholderTextColor="#7f8c8d" secureTextEntry />
                    <TextInput style={styles.input} placeholder="Nhập lại mật khẩu" placeholderTextColor="#7f8c8d" secureTextEntry />
                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.signUpButtonText}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                    <View style={styles.signInContainer}>
                        <Text style={styles.signInText}>Đã có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                            <Text style={styles.signInLink}> Đăng nhập ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f2f6',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: '#33907C',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 130,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    subHeaderText: {
        fontSize: 18,
        color: 'white',
        marginTop: 10,
    },
    form: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#2d3436',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    signUpButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#33907C',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    signUpButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInText: {
        fontSize: 16,
        color: '#7f8c8d',
    },
    signInLink: {
        fontSize: 16,
        color: '#33907C',
        fontWeight: 'bold',
    },
});
