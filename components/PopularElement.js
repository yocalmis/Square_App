import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export const PopularElement = ({mapEl}) => {
    const {image, type, place, feedBack} = mapEl
    console.log(mapEl)
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: image}} />
            <View style={styles.aboutInner}>
                <Text numberOfLines={1} style={styles.placeName}>{place}</Text>
                <Text numberOfLines={1} style={styles.type}>{type}</Text>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 2,
        borderRadius: 16,
        alignItems: "stretch",
        alignContent: 'stretch',
        width: 150,
        marginHorizontal: 5
    },
    image: {
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        width: 150,
        height: 100
    },
    aboutInner: {
        width: 150,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: 'rgba(0,0,0,0.13)',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    placeName: {
        fontFamily: 'roboto-700'
    },
    type: {
        color: '#7E7F81'
    }
})