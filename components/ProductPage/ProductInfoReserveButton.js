import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ContainedButton } from '../ui/Buttons'


export const ProductInfoReserveButton = ({text, onPress}) => {
    return(
        <View style={styles.container}>
            <ContainedButton text={"Reserve"} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: -10,
        alignItems: 'stretch',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 6,
    }
})
