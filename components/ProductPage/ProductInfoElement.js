import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export const ProductInfoElement = ({iconName, text, onPress}) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={styles.container}>
                <View style={styles.iconInner}>
                    <MaterialIcons name={iconName} size={24} color="#4169E1" />
                </View>
                <View style={styles.childrenInner}>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.13)'
    },
    iconInner: {
        marginRight: 16
    },
    childrenInner: {
        flex: 1
    }
})