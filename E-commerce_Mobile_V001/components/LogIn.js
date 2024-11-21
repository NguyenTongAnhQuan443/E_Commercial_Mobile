import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const LogIn = ({ navigation }) => {

    // Login - Google
    const handleGoogleLogin = async () => {
        // try {
        //     await GoogleSignin.hasPlayServices();
        //     const userInfo = await GoogleSignin.signIn();
        //     console.log('Google Login Success:', userInfo);
        // } catch (error) {
        //     console.error('Google Login Error:', error);
        // }
        console.log('Login - Google')
    };

    // Login - Facebook
    const handleFacebookLogin = async () => {
        // try {
        //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        //     if (result.isCancelled) {
        //         console.log('Facebook Login Cancelled');
        //         return;
        //     }
        //     const data = await AccessToken.getCurrentAccessToken();
        //     if (!data) {
        //         console.log('Facebook Login Failed');
        //         return;
        //     }
        //     console.log('Facebook Login Success:', data);
        // } catch (error) {
        //     console.error('Facebook Login Error:', error);
        // }
        console.log('Login - Facebook')
    };
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Welcome to FLEYPET</Text>
                    <Text style={styles.subHeaderText}>Đăng nhập với tài khoản</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#7f8c8d"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        placeholderTextColor="#7f8c8d"
                        secureTextEntry
                    />
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.loginButtonText}>Đăng nhập</Text>
                    </TouchableOpacity>


                    {/* Forgot Password */}
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                    {/* Social Login */}
                    <Text style={styles.orText}>Hoặc đăng nhập bằng</Text>
                    <View style={styles.socialButtons}>
                        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]} onPress={handleFacebookLogin}>
                            <Icon name="facebook" size={24} color="white" />
                            <Text style={styles.socialButtonText}>Facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.socialButton, styles.googleButton]} onPress={handleGoogleLogin}>
                            <Icon name="google" size={24} color="white" />
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sign Up */}
                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signUpLink}> Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

export default LogIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f2f6',
    },
    scrollViewContent: {
        flexGrow: 1,
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
