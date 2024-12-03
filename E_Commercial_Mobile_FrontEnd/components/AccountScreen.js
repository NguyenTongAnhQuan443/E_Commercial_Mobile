import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';  // Import useSelector để lấy dữ liệu từ Redux store

const AccountScreen = () => {
    // Lấy thông tin người dùng từ Redux store
    const user = useSelector((state) => state.user.user);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Profile Section */}
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: user.avatar || 'https://laodongthudo.vn/stores/news_dataimages/minhphuong/042016/15/13/5853_avatar-wallp-1920x1080.jpg' }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileDetails}>
                        <Text style={styles.profileName}>{user.fullName || 'Người dùng'}</Text>
                        <Text style={styles.profileEmail}>{user.email || 'Chưa có email'}</Text>
                    </View>
                    <TouchableOpacity>
                        <MaterialIcons name="edit" size={20} color="green" />
                    </TouchableOpacity>
                </View>

                {/* Menu Options */}
                <TouchableOpacity style={styles.menuItem}>
                    <FontAwesome name="list-alt" size={24} color="black" />
                    <Text style={styles.menuText}>Orders</Text>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="person-outline" size={24} color="black" />
                    <Text style={styles.menuText}>My Details</Text>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Text style={styles.menuText}>Delivery Address</Text>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <FontAwesome name="credit-card" size={24} color="black" />
                    <Text style={styles.menuText}>Payment Methods</Text>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <MaterialIcons name="local-offer" size={24} color="black" />
                    <Text style={styles.menuText}>Promo Code</Text>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <Text style={styles.menuText}>Notifications</Text>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="help-circle-outline" size={24} color="black" />
                    <Text style={styles.menuText}>Help</Text>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="information-circle-outline" size={24} color="black" />
                    <Text style={styles.menuText}>About</Text>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>

                {/* Log Out Button */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    profileDetails: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileEmail: {
        color: 'gray',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
    },
    logoutButton: {
        marginTop: 20,
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
    },
    logoutText: {
        fontSize: 16,
        color: 'green',
    },
});
