import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Chips = ({ text }) => {
    return(
        <View style={styles.chips}>
            <Text style={styles.chipsText}>{ text.capitalize() }</Text>
        </View>
    )
};

export const ProductInfoChips = ({ chipsArr }) => {
    return(
        <View style={styles.container}>
            {chipsArr.map((chips, index) => <Chips key={index} text={chips} />)}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        flexWrap: 'wrap',
        borderColor: 'rgba(0,0,0,0.13)',
        paddingTop: 12,
    },
    chips: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.13)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 18,
        marginBottom: 8,
        marginRight: 8,
    },
    chipsText: {
        fontFamily: 'roboto-400',
        color: '#232323',
        fontSize: 12
    }
})