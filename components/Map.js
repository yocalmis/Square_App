import React, {useEffect, useState, useRef} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import store from '../store/store'
import operations from '../store/fetch'
import {toJS, autorun} from 'mobx';
import {observer} from 'mobx-react';
import {GetPermissionModal} from './getPermissionModal'
import Carousel from 'react-native-snap-carousel';
import { MapElement } from './MapElement.js'
import { SearchBar } from './SearchBar'
import { MapCategories } from './MapCategories'
import { getStatusBarHeight } from "react-native-status-bar-height";
import {UserLocationButton} from './UserLocationButton'


const STATUS_BAR_HEIGHT = getStatusBarHeight()

const MAP_STYLE = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

export const Map = observer(({navigation}) => {
  const getMarkers = navigation.getParam('getMarkers', false)
  const { location, screenWidth, mapPageFlag } = store
  const [sliderVisibility, setSliderVisibility] = useState(false)
  const {places, token, uuid} = operations
  const swiperRef = useRef(null)
  const mapRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    operations.getPlaces()
  }, [])

  useEffect(() => {
		if(getMarkers) operations.getPlaces()
	}, [getMarkers])

  const snapItem = e => {
    !sliderVisibility && setSliderVisibility(true)
    const currentId = e.nativeEvent.id
    const currentIndex = places.findIndex(el => el.uuid === currentId)
    swiperRef.current.snapToItem(currentIndex)
  }
  const onCarouselItemChange = index => {
    const { lat, lng } = places[index]
    mapRef.current.animateToRegion({
      latitude: Number(lat),
      longitude: Number(lng),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  }

  const _updateLocation = ({nativeEvent}) => {
    const {coordinate } = nativeEvent

    store.setLocationByAPI({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude
    })
  }

  const _onMapPress = ({nativeEvent}) => {
    setSliderVisibility(false)
  }

  return(
    <>

    <View style={styles.container}>
    {location && (
      <>
        <MapView
          ref={mapRef}
          showsUserLocation={true}
          style={styles.mapStyle}
          propvider={PROVIDER_GOOGLE}
          customMapStyle={MAP_STYLE}
          showsMyLocationButton={false}
          showsPointsOfInterest={false}
          showsCompass={false}
          onPress={_onMapPress}
          onUserLocationChange={_updateLocation}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          {places.map(marker => {
            const {lat, lng, uuid} = marker
            return <Marker key={uuid} identifier={uuid.toString()}
            coordinate={{ latitude: Number(lat), longitude: Number(lng) }} onPress={snapItem} />
          })}
        </MapView>
        <UserLocationButton mapRef={mapRef} />
      </>
      )}
      <GetPermissionModal />
      <View 
      pointerEvents={sliderVisibility ? 'auto' : 'none'} 
      style={{...styles.slider, opacity: sliderVisibility ? 1 : 0}}>
        <Carousel
          ref={swiperRef}
          data={places}
          renderItem={(item, index) => <MapElement key={index} mapEl={item} navigation={navigation} />}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          onSnapToItem={onCarouselItemChange}
          enableSnap={true}
          useScrollView={true}
        />
      </View>
      
    </View>
    <SearchBar navigation={navigation} isFromOutside="true"/>
    </>
  )
})


const styles = StyleSheet.create(toJS({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapStyle: {
    width: store.screenWidth,
    height: store.screenHeight - STATUS_BAR_HEIGHT,
    marginTop: STATUS_BAR_HEIGHT,
    zIndex: 1,
  },
  slider: {
    position: 'absolute',
    width: '100%',
    height: 310,
    bottom: 0,
    zIndex: 2,
    justifyContent: 'center',

  }
}))
