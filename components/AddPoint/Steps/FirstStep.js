import React, {useRef, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native'
import {observer} from 'mobx-react'
import { ValidableInput } from '../../validationInput'
import { StepHeader } from '../StepHeader'
import { ActionModal } from '../../ui/ActionModal'
import { regexps } from '../../../store/regexps'
import store from '../../../store/store'
import fetch from '../../../store/fetch'
import { autorun } from 'mobx'
import Entypo from 'react-native-vector-icons/Entypo';

import Modal from 'react-native-modal';
import { StepButtons } from '../StepButtons'
import { TabView, SceneMap } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler'


const InputButton = ({text, onPress, color, withChevron, additionalStyle}) => {
   return ( 
      <TouchableOpacity onPress={onPress} style={{...styles.input, ...additionalStyle}}> 
         <Text style={{...styles.inputText, ...(color && {color})}}>{text}</Text>
         {withChevron && <View style={styles.inputBtnChevron}><Entypo name="chevron-small-down" size={24} color="rgb(196, 197, 194)" /></View>}
      </TouchableOpacity>
   )
}

const configUpdater = (config, options) => {
   return {...config, ...options}
}
function renameObjKey(obj, oldKey, newKey) {
   const newObj = {...obj}
   newObj[newKey] = newObj[oldKey];
   delete newObj[oldKey];
   return newObj;
} 
const ParametreInput = observer(({elKey, textHandler, title, nextFunc}) => {
   const {validableInputs} = store
   const {parametres} = validableInputs


   return (
         <ValidableInput style={{...styles.textInput}}
            keyboardShouldPersistTaps={'handled'}
            regExp={regexps.nameRegexp}
            placeholder={title}
            autoCorrect={false}
            autoCapitalize='none'
            errorMesage="Please fill parametres."
            onSubmitEditing={nextFunc}
            id={elKey}
            group="parametres"
            textUpdateHandler={textHandler}
            placeholderTextColor="#BCBDBD"
            textAlign="left"
            multiline={false}
         />
   )
})

export const FirstStep = observer(({setIsValid, routeValidityIndex, setConfig}) => {
   const [category, setCategory] = useState(null)
   const [open, setIsOpen] = useState(false)
   const { validableInputs } = store
   const {stepsFirst} = validableInputs
   const {name, desc} = stepsFirst
   const nameInput = useRef(null)
   const [usernameText, setUsernameText] = useState(null)
   const [descriptionText, setDescriptionText] = useState(null)
   const { categories } = fetch
   const [options, setOptions] = useState(null)
   const [optionsModal, setOptionsModal] = useState(false)
   const [option, setOption] = useState(null)
   const [parametres, setParametres] = useState(null)
   const [parametreModal, setParametreModal] = useState(false)
   const [index, setIndex] = useState(0);
   const tabs = useRef(null)
   const [routes, setRoutes] = useState(null);
   const [routeValidity, setRouteValidity] = useState(null)
   const [activeStep, setActiveStep] = useState(0)
   const [parametreValues, setParametreValues] = useState(null)
   const [parametresValidity, setParametresValidity] = useState(null)
   const {width, height} = Dimensions.get('window')
   
   const buttons = categories && categories.map(category => renameObjKey(category, 'title', 'text'))

   useEffect(() => {
      fetch.fetchCategories()
   }, [])

   useEffect(() => {
      if (category) {
         const opts = category.types.map(option => renameObjKey(option, 'title', 'text'))
         setOptions(opts)
      }
   }, [category])

   useEffect(() => {
      if (option) {
         const { structure } = option
         setParametres(structure)
      }
   }, [option])

   useEffect(() => {
      if (parametres) {
         const routeArr = []
         for (const [key, value] of Object.entries(parametres)) {
            const { title } = value
            routeArr.push({ key, title })
         }
         setRoutes(routeArr)

         const validityArray = new Array(routeArr.length).fill(false)
         setRouteValidity(validityArray)
         
         

         const validationObj = {}
         routeArr.forEach(route => validationObj[route.key] = false)
         store.changeValidGrup('parametres', validationObj)


         setParametreValues(routeArr)
      }
   }, [parametres])

   useEffect(() => {
      if (category && desc && name && option && parametresValidity) {
         setIsValid(prevState => {
            const newState = [...prevState]
            newState[routeValidityIndex] = true
            return [...newState]
         })
         setConfig(prevState => {
            return configUpdater(prevState, {
               title: usernameText,
               description: descriptionText,
               type_id: option.id,
               data: parametreValues.map(parametr => {
                  return {[parametr.key]: parametr.value}
               }),
            })
         })
      }
      else setIsValid(prevState => {
         const newState = [...prevState]
         newState[routeValidityIndex] = false
         return [...newState]
      })
   }, [category, name, desc, option, parametresValidity])


   const nextStep  = () => {
      setIndex(index => activeStep + 1 > routeValidity.length ? routeValidity.length : activeStep + 1)
      setActiveStep(activeStep => {
         return (activeStep + 1 > routeValidity.length) ? routeValidity.length : activeStep + 1
      })
   }
   const backStep = () => {
      setIndex(index => (activeStep - 1 < 0) ? 0 : activeStep - 1)
      setActiveStep(activeStep => {
         return (activeStep - 1 < 0) ? 0 : activeStep - 1
      })
   }
   useEffect(() => {
      if (parametreValues) {
         setParametresValidity(parametreValues.some(parametre => parametre.value))
      }
      console.log(parametreValues)
   }, [parametreValues])
   

   const renderScene = ({ route }) => {
      const findParametre = parametres[route.key]
      return <ParametreInput elKey={route.key} textHandler={text => setParametreValues(oldArr => {
         const findCurrentText = oldArr.findIndex(parametre => parametre.key === route.key)
         const newArr = [...oldArr]
         newArr[findCurrentText]["value"] = text
         return [...newArr]
      })} title={findParametre.title} nextFunc={nextStep} />
   };


   return (
      <ScrollView style={styles.scene}>
         <StepHeader title="Имя и категория" 
         description="Выберите название и категорию вашего завидения для дальнейших инструкций." />
         <ValidableInput ref={nameInput} placeholder="Имя завидения" group="stepsFirst" id="name" style={styles.input} regExp={regexps.nameRegexp} textUpdateHandler={setUsernameText}/>
         <ValidableInput placeholder="Описание" group="stepsFirst" id="desc" style={styles.input} regExp={regexps.nameRegexp} textUpdateHandler={setDescriptionText}/>

         {categories && (
            <InputButton text={category ? category.text : 'Категория'}
            onPress={() => setIsOpen(true)} 
            color={category ? 'black' : null} 
            additionalStyle={{marginBottom: 16}}
            withChevron />
         )}

         
         {options && (
            <>
               <InputButton text={option ? option.text : 'Тип'}
               color={option ? 'black' : null} 
               additionalStyle={{marginBottom: 16}}
               onPress={() => setOptionsModal(true)} 
               withChevron/>

               <ActionModal 
               open={optionsModal}
               buttons={options}
               closeFunc={() => setOptionsModal(false)}
               callBackFunc={index => setOption(options[index])} />
            </>
         )}
         
         
         {buttons && (
            <ActionModal 
            open={open}
            buttons={buttons}
            closeFunc={() => setIsOpen(false)}
            callBackFunc={index => setCategory(buttons[index])} />
         )}

         {parametres && (
            <>

               {Object.keys(parametres).map(key => {
                  const {title} = parametres[key]
                  return (
                     <ParametreInput key={key} elKey={key} textHandler={text => setParametreValues(oldArr => {
                        const findCurrentText = oldArr.findIndex(parametre => parametre.key === key)
                        const newArr = [...oldArr]
                        newArr[findCurrentText]["value"] = text
                        return [...newArr]
                     })} title={title} />
                  )
               })}


               {/* <InputButton text={'Доп. Параметры'}
               color={null} 
               onPress={() => setParametreModal(true)} 
               withChevron /> */}

               
               {/* <Modal isVisible={parametreModal} 
               onBackButtonPress={() => setParametreModal(false)}
               onBackdropPress={() => setParametreModal(false)}
               >
                  <View style={styles.center}>
                     <View style={styles.parametre}>
                        <Text style={styles.header}>Additional Parametres</Text>
                        <TabView
                           ref={tabs}
                           navigationState={{ index, routes }}
                           renderScene={renderScene}
                           onIndexChange={setIndex}
                           initialLayout={{width, height}}
                           renderTabBar={() => null}
                           swipeEnabled={false}
                        />
                        <View style={styles.parametreFooter}>
                           <StepButtons noValidate={true} activeStep={activeStep} routes={routeValidity} length={routeValidity && routeValidity.length} backFunc={backStep} nextFunc={nextStep} lastFunc={() => setParametreModal(false)} />
                        </View>
                     </View>
                  </View>
               </Modal> */}
            </>
         )}

      </ScrollView>
   )
});


const styles = StyleSheet.create({
   scene: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 12
   },
   input: {
      minWidth: '80%',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.13)',
      borderRadius: 6,
      position: 'relative'
   },
   inputText: {
      fontSize: 14,
      paddingVertical: 4,
      color: 'rgb(196, 197, 194)'
   },
   inputBtnChevron: {
      position: 'absolute',
      right: 12,
      top: 8
   },
   buttonsInner: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   inlineButtons: {
      minWidth: '47%',
   },
   parametre: {
      width: '85%',
      height: 200,
      backgroundColor: 'white',
      borderRadius: 8,
   },
   parametreInputContainer: {
      marginVertical: 12
   },
   textInput: {
      maxWidth: '100%',
      backgroundColor: '#EAEDED',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 5
   },
   center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   header: {
      fontFamily: 'roboto-500',
      fontSize: 20,
      color: 'black',
      paddingHorizontal: 12,
      paddingVertical: 10
   }
})
