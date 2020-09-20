import React, {useRef, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView, Image } from 'react-native'
import {observer} from 'mobx-react'
import { StepHeader } from '../StepHeader'
import { regexps } from '../../../store/regexps'
import store from '../../../store/store'
import { Badge } from '../../ui/badge'
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { ImageSlider } from '../../ImageSlider'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ValidableInput } from '../../validationInput'

const {width, height} = Dimensions.get('window')


const InputButton = ({text, onPress, color}) => {
   return ( 
      <TouchableOpacity onPress={onPress} style={{...styles.input}}> 
         <Text style={{...styles.inputText, ...(color && {color})}}>{text}</Text>
      </TouchableOpacity>
   )
}

const configUpdater = (config, options) => {
   return {...config, ...options}
}

const AddImageEl = ({onPress, isChange}) => {
   return (
      <TouchableOpacity style={styles.imageInner} onPress={() => onPress()}>
         <MaterialIcons name={isChange ? 'edit' : 'add-a-photo'} size={24} color="black" />
         <Text style={styles.smallText}>{isChange ? 'Изменить картинки' : 'Добавить картинки'}</Text>
      </TouchableOpacity>
   )
}

const ImageEl = ({image}) => {
   return (
   <View style={styles.imageInner}>
      <Image source={image} style={styles.imageElStyles} />
   </View>
   )
}


export const FourthStep = observer(({setIsValid, routeValidityIndex, setConfig, config}) => {
   const [isModalVisible, setModalVisible] = useState(false)
   const [images, setImages] = useState(null)
   const [open, setIsOpen] = useState(false)

   useEffect(() => {
      if (images) {
         setIsValid(prevState => {
            const newState = [...prevState]
            newState[routeValidityIndex] = true
            return [...newState]
         })
         setConfig(prevState => {
            return configUpdater(prevState, {
               images_list: images
            })
         })
      }
      else setIsValid(prevState => {
         const newState = [...prevState]
         newState[routeValidityIndex] = false
         return [...newState]
      })
   }, [images])


   useEffect(() => console.log(images), [images])

   const openPicker = () => {
      ImagePicker.openPicker({
         multiple: true,
         mediaType: "photo",
         includeExif: false,
         compressImageMaxWidth: 1920,
         compressImageMaxHeight: 1080,
         compressImageQuality: 0.7
      }).then(image => {
         setImages(image)
      });
   }

   return (
      <>
      <View style={styles.scene}>
         <StepHeader title="Доп. Информация" 
         description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget est sed nibh volutpat luctus." />
         
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <AddImageEl isChange={Boolean(images)} onPress={openPicker} />
            {images && (images.map((image, i) => {
               const {path, modificationDate} = image 
               return <ImageEl key={`${modificationDate}${i}`} image={{uri: path}} />
            }))}
         </ScrollView>
        


      </View>
      <Modal isVisible={isModalVisible} style={{margin: 0}}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            {/* <ImagePicker callback={pickerCallback} closeModal={() => setModalVisible(false)} /> */}
          </View>
      </Modal>
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
   },
   input: {
      minWidth: '80%',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.13)',
      borderRadius: 6,
      marginVertical: 12
   },
   inputText: {
      fontSize: 14,
      paddingVertical: 4,
      color: 'rgb(196, 197, 194)'
   },
   imageInner: {
      minWidth: 150,
      minHeight: 100,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 6,
      borderColor: 'rgba(0,0,0,0.13)',
      marginRight: 12
   },
   smallText: {
      fontSize: 12
   },
   imageElStyles: {
      width: 150,
      height: 100,
      borderRadius: 6,
   }
})
