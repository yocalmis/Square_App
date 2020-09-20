import React, {useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import {BottomNavigator} from './bottomNavigation'
import NetInfo from '@react-native-community/netinfo';
import store from '../store/store'
import { observer } from 'mobx-react'
import { autorun } from 'mobx'
import operations from '../store/fetch'



const _setIpAdress = async () => {
  const res = await fetch('https://api.ipify.org?format=json', {
    method: 'GET'
  });
  const data = await res.json()
  store.setIpAdress(data.ip)
}

export const Main = observer(({/* All props here */}) => {
 // alert(operations.token);
  useEffect(() => {
    _setIpAdress()
  }, [])
  return(
    <BottomNavigator />
  )
})
