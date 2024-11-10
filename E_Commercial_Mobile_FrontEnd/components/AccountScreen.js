import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

const AccountScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Profile Section */}
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: 'https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/327579245_5874318742681748_8751004522582569872_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=lnz4dkn_dSoQ7kNvgHU-jPG&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=Awt_H5-w4OdHcCjw-Z1AJby&oh=00_AYCUTfqkcaJQ63UuV51WWzUtLGqa9Ifsnawf8KWvNidYIA&oe=6736535B' }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileDetails}>
                        <Text style={styles.profileName}>Nguyễn Quân</Text>
                        <Text style={styles.profileEmail}>ntanhquan.sly@gmail.com</Text>
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
