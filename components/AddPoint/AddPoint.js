import React, {useRef, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import StepIndicator from 'react-native-step-indicator';
import { ContainedButton, TextButton } from '../ui/Buttons'
import { TabView, SceneMap } from 'react-native-tab-view';
import { FirstStep } from './Steps/FirstStep'
import { SecondStep } from './Steps/SecondStep'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThirdStep } from './Steps/ThirdStep';
import { FourthStep } from './Steps/FourthStep';
import operations from '../../store/fetch';
import {StepButtons} from './StepButtons'
import {observer} from 'mobx-react'

const labels = ["Имя", "Объекты", "Местоположение","Доп. информация"];





const STATUS_BAR_HEIGHT = getStatusBarHeight()

const customLabel = ({position, stepStatus, label, currentPosition}) => {
   const color = stepStatus === 'current' ? '#4aae4f' : 'grey'
   const numberOfLines = stepStatus === 'current' ? 2 : 1
   const styles = {
      color,
      paddingHorizontal: 8,
      fontSize: 12,
   }
   // return <Text numberOfLines={numberOfLines} style={styles}>{label}</Text>
   return null
}

export const AddPoint = observer(({navigation}) => {
   const {user, working_days_id, geonim_id, uploadedImages} = operations
   const {worker} = user
   const { business_uuid } = worker
   const {width, height} = Dimensions.get('window')
   const [activeStep, setActiveStep] = useState(0)
   const [index, setIndex] = useState(0);
   const tabs = useRef(null)
   const [routes] = useState([
     { key: 'general', title: 'Имя' },
     { key: 'objects', title: 'Объекты' },
     { key: 'geo', title: 'Местоположение' },
     { key: 'other', title: 'Доп. информация' },
   ]);
   const [config, setConfig] = useState({
      title: null,
      description: null,
      data: null,
      images_list: null,
      work_days: null,
      coordinates: null,
   })
   
   const goToMaps = () => {
      navigation.navigate('Lock', {getPlaces: true})
   }

   const finishFunc = () => {
      const {work_days} = config
      operations.pushEntity({config, succsessCallback: goToMaps})
   }

   const [routeValidity, setRouteValidity] = useState([
      false,
      false,
      false,
      false
   ])


   const success = () => {
     console.log("Operation succesfully")
   }
 
   const errorFunc = err => {
      if (Array.isArray(err)) {
         err.forEach(error => toast.current.show(error, 1000))
      }
      else if (typeof err === 'object') toast.current.show(JSON.stringify(err), 1000)
      else toast.current.show(err, 1000)
   }
   



   const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
      const getIconName = position => {
         let iconName = null
         switch (position) {
            case 0: iconName = 'edit'; break;
            case 1: iconName = 'access-time'; break;
            case 2: iconName = 'location-on'; break;
            case 3: iconName = 'line-style'; break;
         }
         return iconName
      }
      return {
        name: (stepStatus === 'finished') ? 'done' : getIconName(position),
        color: (stepStatus === 'finished' || stepStatus === 'current') ? '#ffffff' : '#aaaaaa',
        size: 15
      }
    }


   const renderScene = ({ route }) => {
      switch (route.key) {
        case 'general':
           return <FirstStep routeValidityIndex={0} setIsValid={setRouteValidity} setConfig={setConfig} />
        case 'objects':
           return <SecondStep routeValidityIndex={1} setIsValid={setRouteValidity} setConfig={setConfig} />
        case 'geo':
           return <ThirdStep routeValidityIndex={2} setIsValid={setRouteValidity} setConfig={setConfig}/>
        case 'other':
           return <FourthStep routeValidityIndex={4} setIsValid={setRouteValidity} setConfig={setConfig}/>
      }
    };


   const renderStepIndicator = (params) => (
      <MaterialIcons {...getStepIndicatorIconConfig(params)} />
   );

   const nextStep = () => {
      setIndex(index => activeStep + 1 > labels.length ? labels.length : activeStep + 1)

      setActiveStep(activeStep => {
         return (activeStep + 1 > labels.length) ? labels.length : activeStep + 1
      })
   }
   const backStep = () => {
      setIndex(index => (activeStep - 1 < 0) ? 0 : activeStep - 1)
      setActiveStep(activeStep => {
         return (activeStep - 1 < 0) ? 0 : activeStep - 1
      })
   }




   return (
      <View style={styles.container}>
         <StepIndicator
            currentPosition={activeStep}
            labels={labels}
            customStyles={{
               separatorStrokeWidth: 1,
               currentStepStrokeWidth: 1,
               currentStepIndicatorSize: 30,
               stepIndicatorSize: 30,
               stepStrokeCurrentColor: '#6200EE',
               stepStrokeWidth: 1,
               stepStrokeFinishedColor: '#6200EE',
               stepStrokeUnFinishedColor: '#aaaaaa',
               separatorFinishedColor: '#6200EE',
               separatorUnFinishedColor: '#aaaaaa',
               stepIndicatorFinishedColor: '#6200EE',
               stepIndicatorUnFinishedColor: '#ffffff',
               stepIndicatorCurrentColor: '#6200EE',
               stepIndicatorLabelFontSize: 13,
               currentStepIndicatorLabelFontSize: 13,
               stepIndicatorLabelCurrentColor: '#ffffff',
               stepIndicatorLabelFinishedColor: '#ffffff',
               stepIndicatorLabelUnFinishedColor: '#aaaaaa',
               labelColor: '#999999',
               labelSize: 12,
               currentStepLabelColor: '#6200EE'
            }}
            stepCount={labels.length}
            renderLabel={() => null}
            renderStepIndicator={renderStepIndicator}
         />
         <TabView
            ref={tabs}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width, height}}
            renderTabBar={() => null}
            swipeEnabled={false}
         />
         <StepButtons lastFunc={finishFunc} activeStep={activeStep} routes={routeValidity} length={labels.length} backFunc={backStep} nextFunc={nextStep} />
      </View>
   )
})

const styles = StyleSheet.create({
   container: {
      paddingTop: STATUS_BAR_HEIGHT + 12,
      backgroundColor: 'white',
      flex: 1
   },
   stepBtnConatiner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
      marginTop: 'auto',
      paddingVertical: 12
   },
   scene: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 12
   },
   sceneHeading: {
      fontSize: 24,
      fontFamily: 'raleway-500',
      marginBottom: 4
   },
   sceneDetails: {
      fontFamily: 'roboto-400',
      marginBottom: 24,
      color: 'grey'
   }
})
