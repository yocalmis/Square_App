import React, { useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import operations from '../../store/fetch'
import store from '../../store/store'
import MapView, {PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Heading } from '../ui/heading'
import { Button } from '../ui/Buttons'


export const PickPlace = ({navigation}) => {
  const mapRef = useRef(null)
  const { location, screenWidth } = store
  return (
    <ScrollView>
      {location && (
        <MapView
          ref={mapRef}
          showsUserLocation={true}
          style={styles.mapStyle}
          propvider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
        </MapView>
        )}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  main: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapStyle: {
    width: store.screenWidth,
    height: '100%'
  }
})
