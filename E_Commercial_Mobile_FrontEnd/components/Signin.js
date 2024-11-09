import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';

WebBrowser.maybeCompleteAuthSession();

const Signin = () => {

    const [userInfo, setUserInfo] = useState(null);

    // login with google
    const [requestGoogle, googleResponse, promptAsyncGoogle] = Google.useAuthRequest({
        webClientId: '532438484063-s48q5jrlgs619eo1aks5qhmed7v7k12e.apps.googleusercontent.com',
        androidClientId: '532438484063-f44kkc90kb2ucnei79hps7hhjth8tgt2.apps.googleusercontent.com',
        redirectUri: Google.useAuthRequest.redirectUri,
        scopes: ['profile', 'email'],
    });

    // login with facebook
    const [requestFacebook, responseFacebook, promptAsyncFacebook] = Facebook.useAuthRequest({
        clientId: '3955966801294068',
        permissions: ['public_profile', 'email'], // Scope chính xác cho Facebook
        responseType: 'token',
    });

    // handle google response
    useEffect(() => {
        if (googleResponse?.type === 'success') {
            const { authentication } = googleResponse;
            fetchUserInfo(authentication.accessToken, 'google');
        }
    }, [googleResponse]);

    // handle facebook response
    useEffect(() => {
        if (responseFacebook?.type === 'success') {
            const { authentication } = responseFacebook;
            fetchUserInfo(authentication.accessToken, 'facebook');
        }
    }, [responseFacebook]);

    const fetchUserInfo = async (token, provider) => {
        try {
            const backendResponse = await fetch(`http://localhost:8080/api/v1/auth/login/${provider}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await backendResponse.json();
            setUserInfo(data);
        } catch (error) {
            console.log('Error fetching user info:', error);
            console.log('Token:', token);
        }
    };

    // login with facebook



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonGoogle} onPress={() => promptAsyncGoogle()} disabled={!requestGoogle}>
                    <Image source={require('../assets/icons/google.png')} style={styles.buttonImage} />
                    <Text style={styles.buttonText}>
                        Sign in with Google
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFacebook} onPress={() => promptAsyncFacebook()} disabled={!requestFacebook}>
                    <Image source={require('../assets/icons/facebook.png')} style={styles.buttonImage} />
                    <Text style={styles.buttonText}>
                        Sign in with Facebook
                    </Text>
                </TouchableOpacity>
            </View>
            {userInfo && (
                <View style={styles.userInfo}>
                    <Text>Hello, {userInfo.name}!</Text>
                    <Text>Email: {userInfo.email}</Text>
                    <Text>Picture:{userInfo.picture}</Text>
                    <Image source={{ uri: userInfo.picture }} style={styles.userImage} />
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop: 50,
        width: '80%',
    },
    buttonGoogle: {
        flexDirection: 'row',
        backgroundColor: '#5383EC',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 15,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonFacebook: {
        flexDirection: 'row',
        backgroundColor: '#3b5998',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginHorizontal: 20,
    },
    buttonText: {
        fontSize: 20,
        marginLeft: 10,
        color: '#fff',
    },
    userInfo: {
        marginTop: 50,
        alignItems: 'center',
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
    },

})

export default Signin;