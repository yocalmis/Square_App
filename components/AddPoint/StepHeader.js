import React, {useRef, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'



export const StepHeader = ({title, description}) => {
   return(
      <>
         <Text style={styles.sceneHeading}>{title}</Text>
         <Text style={styles.sceneDetails}>{description}</Text>
      </>
   )
}


const styles = StyleSheet.create({
   sceneHeading: {
      fontSize: 24,
      fontFamily: 'raleway-500',
      marginBottom: 4,
      color: 'black'
   },
   sceneDetails: {
      fontFamily: 'roboto-400',
      marginBottom: 24,
      color: 'grey'
   }
})
