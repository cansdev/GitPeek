import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

const UserCard = () => {

    return(
        <View style={styles.container}>
            <View style={styles.textLayout}>
                <Text style={styles.username}> John Doe </Text>
                <Text style={styles.userAddress}> placeholder@mail.com </Text> 
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#ced4de',
        borderRadius: 10,
        borderColor: '#bda9a8',
        borderShadow: 2,
        flexDirection: 'row',
        alignItems: 'baseline',
        width: '70%',
    },

    textLayout: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },

    username: {
        fontSize: 30,
    },

    userAddress: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default UserCard;