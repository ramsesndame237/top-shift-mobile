
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
const CardSkeleton = () => {
    return (
        <View style={styles.container}>
            {/* Placeholder card content */}
            <View style={styles.placeholder} />
            <View style={styles.placeholder} />
            <View style={styles.placeholder} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6F6F6',
        borderRadius: 13,
        padding: 16,
        marginBottom: 16,
        marginTop: 50,
    },
    placeholder: {
        backgroundColor: '#ccc',
        height: 16,
        borderRadius: 4,
        marginBottom: 8,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        marginTop: 50,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 8,
        color: "green",
    },
    paragraph: {
        fontSize: 15,
        color: '#555555',
    },
});