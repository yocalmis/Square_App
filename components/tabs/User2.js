import React, { useRef } from 'react'
import { StyleSheet, StatusBar } from 'react-native';
import store from '../../store/store'
import {ActionNavigator} from '../actionNavigator'


export const User2 = () => {
  return (
    <ActionNavigator />
  )
}


const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 12,
    marginTop: StatusBar.currentHeight
  }
})
