import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

import config from '../config/config';

import { login } from '../reduxToolkit/slices/userSlice';  // Import login action

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();  // Khai báo useDispatch

    const handleLogin = async () => {
        try {

            const url = config.host + config.endpoints.login;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Thành công', 'Đăng nhập thành công!');
                // Lưu thông tin người dùng vào Redux
                dispatch(login(data.userDto));  // Lưu thông tin vào store
                navigation.navigate('Home');  // Chuyển đến trang Home
            } else {
                Alert.alert('Lỗi', data.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại!');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome to FLEYPET</Text>
                <Text style={styles.subHeaderText}>Đăng nhập với tài khoản</Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#7f8c8d"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#7f8c8d"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Đăng nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                </TouchableOpacity>

                <Text style={styles.orText}>Hoặc đăng nhập bằng</Text>
                <View style={styles.socialButtons}>
                    <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
                        <Icon name="facebook" size={24} color="white" />
                        <Text style={styles.socialButtonText}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                        <Icon name="google" size={24} color="white" />
                        <Text style={styles.socialButtonText}>Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Bạn chưa có tài khoản?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signUpLink}> Đăng ký ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f2f6',
    },
    header: {
        flex: 1.5,
        backgroundColor: '#33907C',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingVertical: 20,
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
        flex: 3,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#2d3436',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    loginButton: {
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
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    orText: {
        fontSize: 16,
        color: '#7f8c8d',
        marginVertical: 10,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
        height: 50,
        borderRadius: 25,
    },
    facebookButton: {
        backgroundColor: '#3b5998',
    },
    googleButton: {
        backgroundColor: '#db4a39',
    },
    socialButtonText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    forgotPassword: {
        fontSize: 16,
        color: '#3498db',
        marginTop: 10,
    },
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    signUpText: {
        fontSize: 16,
        color: '#7f8c8d',
    },
    signUpLink: {
        fontSize: 16,
        color: '#33907C',
        fontWeight: 'bold',
    },
});
