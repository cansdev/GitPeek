import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, ActivityIndicator, Text, TouchableOpacity, Button } from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome'; 


const RepoButton = ({user, color}) => {

    const handleRepoPress = () => {
        console.log(user.login + ' repositories')
        router.navigate({
          title: 'Repo List',
          pathname: './repoList',
          params: {
            login: user.login
          }
        })
      };

    return (
        <TouchableOpacity 
        style={styles.repoButton}
        onPress={() => handleRepoPress({user})}
        >
            <View style={[styles.container, {backgroundColor: color || '#495569' }]}>
                <Text style={styles.repoButtonText}> Repositories </Text>
                <Icon name="chevron-right" size={30} color="white" />
            </View> 
        </TouchableOpacity>

      );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#697891',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bda9a8',
        flexDirection: 'row',
    },


    repoButton: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    repoButtonText: {
        color: 'white',
        fontSize: 30,
    }

});

export default RepoButton;