import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Modal } from 'react-native';
import operations from '../../store/fetch'
import store from '../../store/store'
import MapView, {PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Heading } from '../ui/heading'
import { Button, ModalButton } from '../ui/Buttons'
import {ValidableInput} from '../validationInput'
import {regexps} from '../../store/regexps'

const renameObj = (obj, values) => {
  let newObj = {...obj}
  values.forEach(item => {
    if (newObj[item.oldValue]) {
      newObj[item.newValue] = newObj[item.oldValue]
      delete newObj[item.oldValue]
    }
  })
  return newObj
}
export const AddPoint = ({ navigation }) => {
  const [marker, setMarker] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const mapPointTitle = useRef(null)
  const mapPointId = useRef(null)
  const mapRef = useRef(null)
  const { location, screenWidth } = store
  const { token } = operations
  const { dontEmpty } = regexps

  console.log(token)
  useEffect(() => {
    marker && mapRef.current.animateToRegion({
      latitude: marker.latitude,
      longitude: marker.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  }, [marker])

  const closeModal = () => {
    setModalVisible(false)
    setMarker(null)
  }

  const goToApp = () => {
    console.log('success')
    // navigation.navigate('Main')
  }
  const errorLog = (err) => {
    console.log('Ops we have error', err)
  }


  const submitPoint = () => {
    const newObj = renameObj(marker, [
      {
        oldValue: 'latitude',
        newValue: 'lat'
      },
      {
        oldValue: 'longitude',
        newValue: 'lng'
      }
    ]);
    const data = {
      type_id: 2,
      locality_id: 2,
      title: mapPointTitle.current._lastNativeText,
      house_number: mapPointId.current._lastNativeText,
      location: {...newObj}
    }
    operations.pushPoint(data, goToApp, errorLog)
    console.log(data)
  }

  const mapPress = ({ nativeEvent }) => {
    const { coordinate }  = nativeEvent
    setMarker(coordinate)
    setModalVisible(true)
  }
  return (
    <ScrollView>
      {location && (
        <MapView
          ref={mapRef}
          showsUserLocation={false}
          style={styles.mapStyle}
          propvider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={mapPress}
          onPoiClick={mapPress}
          >
          {marker && <Marker coordinate={marker} />}
        </MapView>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          statusBarTranslucent={true}
          onRequestClose={closeModal}>
          <View style={styles.backdrop}>
            <View style={styles.modalInner}>
              <Heading text="Point Details"/>

              <ValidableInput regExp={dontEmpty}
              group="modalInputs"
              id="mapPointTitle"
              ref={mapPointTitle}
              placeholder="Place Name"
              returnKeyType='next'
              onSubmitEditing={() => mapPointId.current.focus()}
              blurOnSubmit={false}
              style={styles.modalInput} />

              <ValidableInput group="modalInputs"
                regExp={dontEmpty}
                id="mapPointId"
                ref={mapPointId}
                placeholder="Build and Door Number"
                style={styles.modalInput}
                returnKeyType='send'
                onSubmitEditing={submitPoint}
              />

              <View style={styles.modalFooter}>
                <ModalButton text="Cancel" onPress={closeModal} />
                <ModalButton text="Save" onPress={submitPoint} />
              </View>
            </View>
          </View>
        </Modal>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  main: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop:30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapStyle: {
    width: store.screenWidth,
    height: store.screenHeight
  },
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.45)'
  },
  modalInner: {
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  modalInput: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginBottom: 12,
    fontFamily: 'roboto-400'
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4
  }
})
