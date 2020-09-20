import React, {forwardRef} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from '../store/store'
import {observer} from 'mobx-react';

export const UserLocationButton = observer(forwardRef((props, ref) => {
    const {style, mapRef} = props
    const {userIp, location} = store

    const _locateToCoors = () => {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    }

    return (
        <TouchableOpacity style={{...styles.container, ...style}} onPress={_locateToCoors}>
            <Ionicons name="md-locate" size={24} color="black" />
        </TouchableOpacity>
    )
}))


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 35,
        height: 35,
        alignContent: 'center',
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        top: 75,
        right: 16,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 3,
    }
})