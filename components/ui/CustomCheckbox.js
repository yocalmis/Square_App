import React, {useState, useEffect, useRef} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


const {width, height} = Dimensions.get('window')


export const TextCheckBox = ({text, checked, onPress, size, fontSize, color, marginRight}) => {
   const containerStyles = getContainer(checked, color)
   const textStyles = getText(checked, color)
   return (
      <TouchableOpacity onPress={onPress} style={{
         ...styles.container, 
         ...(size && {width: size, height: size}),
         ...containerStyles.container,
         ...(marginRight && {marginRight})
         }}>
         <Text style={{
            ...styles.text,
            ...(fontSize && {fontSize}),
            ...textStyles.text
         }}>{text}</Text>
      </TouchableOpacity>
   )
}

const getContainer = (active, color) => {
   return StyleSheet.create({
      container: {
         borderColor: color || '#6200EE',
         backgroundColor: active ? (color || '#6200EE') : 'white'
      }
   })
}
const getText = (active, color) => {
   return StyleSheet.create({
      text: {
         color: active ? 'white' : (color ? color : '#6200EE'),
      }
   })
}

const styles = StyleSheet.create({
   container: {
      borderRadius: Math.round(width + height) / 2,
      borderWidth: 1,
      width: 48,
      height: 48,
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
   },
   text: {
      fontFamily: 'roboto-500',
      fontSize: 14
   }
})
