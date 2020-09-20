import React, {useRef, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native'
import {observer} from 'mobx-react'
import { StepHeader } from '../StepHeader'
import { regexps } from '../../../store/regexps'
import store from '../../../store/store'
import { Badge } from '../../ui/badge'
import MapView, {PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

const {width, height} = Dimensions.get('window')


const configUpdater = (config, options) => {
   return {...config, ...options}
}
function renameObjKey(obj, oldKey, newKey) {
   const newObj = {...obj}
   newObj[newKey] = newObj[oldKey];
   delete newObj[oldKey];
   return newObj;
} 


export const ThirdStep = observer(({setIsValid, routeValidityIndex, setConfig, config}) => {
   const mapRef = useRef(null)
   const { location, screenWidth } = store
   const [marker, setMarker] = useState(null)

   useEffect(() => {
      if(marker) {
         setIsValid(prevState => {
            const newState = [...prevState]
            newState[routeValidityIndex] = true
            return [...newState]
         })
         setConfig(prevState => {
            return configUpdater(prevState, {coordinates: marker})
         })
      }
      else setIsValid(prevState => {
         const newState = [...prevState]
         newState[routeValidityIndex] = false
         return [...newState]
      })
   }, [marker])
   const addPoint = e => {
      const {coordinate, position} = e.nativeEvent
      console.log(coordinate)
      setMarker(coordinate)
   }

   return (
      <>
      <View style={styles.scene}>
         <StepHeader title="Местоположение" 
         description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget est sed nibh volutpat luctus." />
         {location && (
            <MapView
               ref={mapRef}
               showsUserLocation={true}
               style={styles.mapStyle}
               propvider={PROVIDER_GOOGLE}
               onPress={addPoint}
               initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
               }}>
                  {marker && <Marker coordinate={marker} />}
            </MapView>
         )}
      </View>
      </>
   )
});


const styles = StyleSheet.create({
   scene: {
      paddingHorizontal: 24,
      paddingVertical: 12
   },
   mapStyle: {
      width: '100%',
      height: '100%',
   }
})
