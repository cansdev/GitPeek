// search.tsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '@/components/SearchBar/index';
import { useSession } from '@/context/AuthContext';

const SearchScreen = () => {
    const { userId } = useSession();
    console.log("Currently on user: ",userId)

    useEffect(() => {
        console.log('User ID after login:', userId);
    }, [userId]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>GitHub</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SearchBar />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        backgroundColor: '#fff',
        paddingVertical: 35,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginTop: 20,
    },
    scrollContainer: {
        paddingTop: 10,
    },
});

export default SearchScreen;
