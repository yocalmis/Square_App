import React, { useState, useEffect } from 'react';
import { Image, Modal, Text, TouchableOpacity, View, Alert, StyleSheet, Dimensions,
StatusBar, Linking, Platform, AppState } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import {toJS, autorun} from 'mobx';
import {observer} from 'mobx-react';
import store from '../store/store';
import { Button } from './ui/Buttons';
import * as SecureStore from 'expo-secure-store';


const ACCESS_KEY = '5de12e7ba0d3fa13fe9cc710ac59436b'




export const GetPermissionModal = observer(() => {
  const [modalVisible, setModalVisible] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const {location, userIp} = store


  const getLocationByIP = async (ip) => {
    const res = await fetch(`http://api.ipstack.com/${ip}?access_key=${ACCESS_KEY}`, {
      method: 'GET'
    })
    const data = await res.json();
    store.setLocationByAPI({
      latitude: data.latitude,
      longitude: data.longitude
    })
  }
  const handleAppStateChange = nextAppState => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      askToPermission()
    }
    setAppState(nextAppState)
  }


  useEffect(() => {
    askToPermission()
    AppState.addEventListener('change', handleAppStateChange)
    return function cleanup() {
      AppState.removeEventListener('change', handleAppStateChange)
    };
  }, [])

  const openSettings = () => {
    if (Platform.OS === 'IOS') {
      Linking.openURL('app-settings:')
    }
    else {
      IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
    }
    setModalVisible(false)
  }

  const askToPermission = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        getLocationByIP(userIp)
        setModalVisible(false)
      }

      let _getLcation = await Location.getCurrentPositionAsync({});
      store.setLocation(_getLcation.coords);
      setModalVisible(false)
    }
    catch(error) {
      let status = await Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled ) {
        setModalVisible(true)
      }
    }
  }
  const ratio = store.screenWidth / 3000;

  const rejectModal = () => {
    setModalVisible(!modalVisible)
    getLocationByIP(userIp)
  }

  return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={false}
        hardwareAccelerated={true}
        onRequestClose={rejectModal}
        >

        <View style={styles.container}>
          <View style={styles.backdrop}></View>
          <View style={styles.inner}>
            <Image style={{
              width: '100%',
              height: 2000 * ratio,
              resizeMode: 'contain'
            }}
            source={require('../assets/getGeoPicture.jpg')} />
            <Text style={styles.heading}>Need Your Location!</Text>
            <Text style={styles.desc}>Please give us access to your GPS Location</Text>
            <Button
              text="Allow"
              onPress={() => openSettings()}
              btnStyles={styles.alertButton}
              txtStyles={styles.colorWhite}
            />
            <Button
              text="NO, OTHER TIME"
              onPress={rejectModal}
              btnStyles={styles.clearButton}
              txtStyles={styles.grey}
            />
          </View>
        </View>
      </Modal>
  );
})

const styles = StyleSheet.create(toJS({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12
  },
  backdrop: {
    position: 'absolute',
    width: store.screenWidth,
    height: store.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  heading: {
    fontSize: 26,
    fontFamily: 'roboto-700',
    color: '#333'
  },
  desc: {
    color: 'grey',
    marginBottom: 50
  },
  alertButton: {
    backgroundColor: '#E4484B',
    borderRadius: 32,
    flexDirection: 'row',
    minWidth: '80%',
    justifyContent: 'center',
    textAlign: 'center',

  },
  colorWhite: {
    color: '#fff',
    fontSize: 18
  },
  clearButton: {
    backgroundColor: 'transparent',
    marginTop: 16
  },
  grey: {
    color: 'grey',
    fontFamily: 'roboto-500'
  }
}))
