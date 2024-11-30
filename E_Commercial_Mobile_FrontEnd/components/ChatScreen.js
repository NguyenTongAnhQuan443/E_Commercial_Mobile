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
                <Image
                    source={isUser ? require('../assets/icons/profile.png') : require('../assets/icons/chatbot64.png')}
                    style={styles.avatar}
                />
                <View style={styles.messageBubble}>
                    <Text style={styles.messageText}>{item.text}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.chatContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item, index) => index.toString()}
                        inverted
                        style={styles.messageList}
                    />
                    {isBotTyping && (
                        <View style={styles.typingContainer}>
                            <ActivityIndicator size="small" color="#0084FF" />
                            <Text style={styles.typingText}>Bot is typing...</Text>
                        </View>
                    )}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type a message..."
                            value={inputMessage}
                            onChangeText={setInputMessage}
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                            <Text style={styles.sendButtonText}>Send</Text>
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
        backgroundColor: '#F9F9F9',
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    messageList: {
        flex: 1,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    userMessageContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    botMessageContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 15,
        backgroundColor: '#E1E1E1',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
    },
    input: {
        flex: 1,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        marginRight: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    sendButton: {
        padding: 10,
        backgroundColor: '#0084FF',
        borderRadius: 25,
    },
    sendButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    typingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    typingText: {
        marginLeft: 8,
        color: '#888',
    },
});
