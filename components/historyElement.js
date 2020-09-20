import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import {CategoryBuildIcon} from './images/home_icon'
import store from '../store/store'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { getDistance } from 'geolib';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const HistoryElement = observer(({ data }) => {

    const {container, iconInner, textInner, heading, latency, content, deleteInner} = styles
    const {type, name, latitude, longitude} = data
    const { location } = store

    let latencyBetweenDistances = location ? getDistance(
      { latitude: location.latitude, longitude: location.longitude},
      { latitude, longitude },
    ) : null;

    return (
        <View style={container}>
            <View style={content}>
                <View style={iconInner}><CategoryBuildIcon size="28" color="black" /></View>
                <View style={textInner}>
                    <Text style={heading}>{name}</Text>
                    <Text style={latency}>{latencyBetweenDistances}m</Text>
                </View>
            </View>
            <View style={deleteInner}>
                <Ionicons name="ios-close" size={24} color="grey" />
            </View>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.13)',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    content: {
        flexDirection: 'row'
    },
    iconInner: {
        marginRight: 16
    },
    textInner: {
        
    },
    heading: {
        fontFamily: 'roboto-700'
    },
    latency: {
        color: 'grey'
    },
    deleteInner: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,

    }
})