import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, ActivityIndicator, Text, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import UserCard from './UserCard';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you want to use FontAwesome icons


const RepoButton = () => {

    return (
        <View style={styles.container}>
            <Button
            title='Repositories'    
            >
                <Icon name="chevron-right" size={20} color="black" />
            </Button>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

});

export default RepoButton;