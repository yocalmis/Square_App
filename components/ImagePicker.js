import React, {useRef, useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { ImageBrowser } from 'expo-image-picker-multiple'




export const ImagePicker = ({callback, closeModal}) => {
   const [onSubmit, setOnSubmit] = useState(null)
   const [selectedImages, setSelectedImages] = useState(0)
   return(
      <View style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => closeModal()}>
               <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.desc}>You selected {selectedImages} images.</Text>
            <TouchableOpacity onPress={() => onSubmit ? onSubmit() : closeModal()}>
               <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
         </View>
         <ImageBrowser 
          onChange={(count, callback) => {
            setSelectedImages(count)
            setOnSubmit(() => callback)
          }}
          callback={assetsInfo => assetsInfo.then(x => callback(x)) } />
      </View>
   )
}



const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.13)'
   },
   button: {
      paddingVertical: 6,
      paddingHorizontal: 12
   },
   desc: {
      color: 'grey',
      fontSize: 13
   },
   buttonText: {
      fontFamily: 'roboto-500',
      color: '#6200EE'
   }
})
