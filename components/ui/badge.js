import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Badge = ({ text, hasButton, buttonTitle, buttonFunc, style, labelStyle }) => {
    return (
    <View style={{...styles.container, ...style}}>
        <Text style={{...styles.text, ...labelStyle}}>{ text }</Text>
        {
            hasButton && (
                <TouchableOpacity onPress={buttonFunc}>
                    <Text style={styles.buttonText}>{ buttonTitle }</Text>
                </TouchableOpacity>
            )
        }
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6F6F6',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 18,
        justifyContent: 'space-between'
    },
    text: {
        color: '#7E7F81',
        fontFamily: 'roboto-500',
        fontSize: 13
    },
    buttonText: {
        color: '#7E7F81',
        fontFamily: 'roboto-400',
        fontSize: 13
    }
})