import React, { useState, useRef } from 'react';
import {
    View, Text, TextInput, FlatList, StyleSheet,
    ActivityIndicator, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import config from '../config/config';

const API_URL = config.host + config.endpoints.chatbot;

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const flatListRef = useRef();

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = { text: inputMessage, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputMessage('');
        setLoading(true);
        setIsBotTyping(true);

        try {
            const response = await axios.post(API_URL, { question: inputMessage });

            setTimeout(() => {
                const chatbotMessage = { text: response.data.answer, sender: 'bot' };
                setMessages(prevMessages => [...prevMessages, chatbotMessage]);
                setIsBotTyping(false);
            }, 1000);
        } catch (error) {
            console.error(error);
            setIsBotTyping(false);
        } finally {
            setLoading(false);
        }
    };

    const renderMessage = ({ item }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.botMessageContainer]}>
                <View style={isUser ? styles.userMessage : styles.botMessage}>
                    {/* Avatar */}
                    <Image
                        source={isUser ? require('../assets/icons/profile.png') : require('../assets/icons/chatbot64.png')}
                        style={[styles.avatar, isUser && styles.avatarUser]} // User avatar on the right
                    />
                    {/* Message */}
                    <Text style={styles.messageText}>{item.text}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.chatContainer}>
                    <FlatList
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item, index) => index.toString()}
                        ref={flatListRef}
                        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
                        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
                    />
                    {isBotTyping && <ActivityIndicator size="small" color="#000" style={styles.typingIndicator} />}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={inputMessage}
                            onChangeText={setInputMessage}
                            placeholder="Nhập câu hỏi của bạn ..."
                        />
                        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                            <Text style={styles.sendButtonText}>Gửi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    messageContainer: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    userMessageContainer: {
        justifyContent: 'flex-end', // User messages are on the right
        alignSelf: 'flex-end',
    },
    botMessageContainer: {
        justifyContent: 'flex-start', // Bot messages are on the left
        alignSelf: 'flex-start',
    },
    userMessage: {
        flexDirection: 'row-reverse', // User's messages are reversed
        alignItems: 'center',
    },
    botMessage: {
        flexDirection: 'row', // Bot's messages stay normal
        alignItems: 'center',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 5,
    },
    avatarUser: {
        marginRight: 10, // Add space between the avatar and the text for user
    },
    messageText: {
        maxWidth: '80%',
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        fontSize: 16,
        color: '#333',
    },
    typingIndicator: {
        position: 'absolute',
        bottom: 10,
        left: '50%',
        transform: [{ translateX: -15 }],
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    input: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
