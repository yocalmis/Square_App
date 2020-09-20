import React, {useRef, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView } from 'react-native'
import {observer} from 'mobx-react'
import { ValidableInput } from '../../validationInput'
import { StepHeader } from '../StepHeader'
import { ActionModal } from '../../ui/ActionModal'
import { regexps } from '../../../store/regexps'
import store from '../../../store/store'
import { autorun, configure } from 'mobx'
import { TextCheckBox } from '../../ui/CustomCheckbox'
import { Badge } from '../../ui/badge'
import DateTimePicker from '@react-native-community/datetimepicker';
import {ContainedButton} from '../../ui/Buttons'


function minutesWithLeadingZeros(date) { 
  return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
}
function hoursWithLeadingZeros(date) {
   let currentHours = date.getHours();
   currentHours = ('0' + currentHours).slice(-2);
   return currentHours;
}

function getTimeFromDate(date) {
   const getHours = hoursWithLeadingZeros(date)
   const getMinutes = minutesWithLeadingZeros(date)
   return `${getHours}:${getMinutes}`
}

const {width, height} = Dimensions.get('window')






const TimeButton = ({text, onPress, color}) => {
   return ( 
      <TouchableOpacity onPress={onPress} style={{...styles.timeBtn}}> 
         <Text style={{...styles.timeBtnText, ...(color && {color})}}>{text}</Text>
      </TouchableOpacity>
   )
}
const dayNames = [
   'Пн',
   'Вт',
   'Ср',
   'Чт',
   'Пт',
   'Сб',
   'Вс'
]


const configUpdater = (config, options) => {
   return {...config, ...options}
}


export const SecondStep = observer(({setIsValid, routeValidityIndex, setConfig, config}) => {

   const [startPicker, setStartPicker] = useState(false)
   const [endPicker, setEndPicker] = useState(false)
   const [breakStartPicker, setBreakStartPicker] = useState(false)
   const [breakEndPicker, setBreakEndPicker] = useState(false)

   const [startTime, setStartTime] = useState('08:00')
   const [endTime, setEndTime] = useState('17:00')

   const [breakStartTime, setBreakStartTime] = useState('12:00')
   const [breakEndTime, setBreakEndTime] = useState('13:00')


   const [workDays, setWorkDays] = useState([
      true,
      true,
      true,
      true,
      true,
      false,
      false
   ])

   useEffect(() => {
      if(workDays && endTime && startTime && breakStartTime && breakEndTime) {
         setIsValid(prevState => {
            const newState = [...prevState]
            newState[routeValidityIndex] = true
            return [...newState]
         })
         setConfig(prevState => {
            return configUpdater(prevState, {
               work_days: {
                  work_days: workDays.filter(_=>_).map((_,index)=>index+1),
                  open_time: startTime,
                  close_time: endTime,
                  break_start: breakStartTime,
                  break_end: breakEndTime
               },     
             
            })

         })
      }
      else setIsValid(prevState => {
         const newState = [...prevState]
         newState[routeValidityIndex] = false
         return [...newState]
      })

   }, [workDays, endTime, startTime, breakStartTime, breakEndTime])

   const calculateWidth = Math.round(((width - 42) / 7) - 8)
   const fontSize = calculateWidth / 3


   
   const onChangeFunc = (event, pickerSetter, timeSetter) => {
      pickerSetter(false)
      const {nativeEvent} = event
      if (nativeEvent && nativeEvent.timestamp) {
         const currentDate = new Date(nativeEvent.timestamp)
         const currentTime = getTimeFromDate(currentDate)
         timeSetter(currentTime)
      }
   }


   return (
      <>
      <View style={styles.scene}>
         <StepHeader title="График работы" 
         description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget est sed nibh volutpat luctus." />
         <Badge text="Рабочие дни" style={{
            marginBottom: 12,
            paddingHorizontal: 0,
            backgroundColor: 'white'
         }}
         labelStyle={{
            color: 'black'
         }}
         />
         <View style={styles.dayInner}>
            {dayNames.map((item, index) => {
               return (
                  <TextCheckBox 
                  key={index} 
                  checked={workDays[index]} 
                  text={item} 
                  size={calculateWidth}
                  fontSize={fontSize}
                  onPress={() => setWorkDays(prevState => {
                     const newArr = [...prevState]
                     newArr[index] = !prevState[index]
                     return [...newArr]
                  })} />
               )
            })}
         </View>
      </View>
      <Badge text="График работы" style={{
            marginTop: 12,
            paddingHorizontal: 24,
            backgroundColor: 'white'
         }}
         labelStyle={{
            color: 'black'
         }}
      />
      <View style={styles.timeInner}>
         <TimeButton text={startTime} onPress={() => setStartPicker(true)} />
         <TimeButton text={endTime} onPress={() => setEndPicker(true)} />
      </View>
      <Badge text="График перерыва" style={{
            marginTop: 12,
            paddingHorizontal: 24,
            backgroundColor: 'white'
         }}
         labelStyle={{
            color: 'black'
         }}
      />
      <View style={styles.timeInner}>
         <TimeButton text={breakStartTime} onPress={() => setBreakStartPicker(true)} />
         <TimeButton text={breakEndTime} onPress={() => setBreakEndPicker(true)} />
      </View>
      {/* <View style={{flex: 1}}>
         
         <Badge text="Начало работы" style={{
               marginTop: 12,
               marginBottom: 12,
               paddingHorizontal: 24,
               backgroundColor: 'white'
            }}
            labelStyle={{
               color: 'black'
            }}
         />

         </View> */}
         {startPicker && (
            <DateTimePicker
               value={new Date()}
               mode={"time"}
               is24Hour={true}
               display="clock"
               onChange={event => onChangeFunc(event, setStartPicker, setStartTime)}
            />
         )}
         {endPicker && (
            <DateTimePicker
               value={new Date()}
               mode={"time"}
               is24Hour={true}
               display="clock"
               onChange={event => onChangeFunc(event, setEndPicker, setEndTime)}
            />
         )}
         {breakStartPicker && (
            <DateTimePicker
               value={new Date()}
               mode={"time"}
               is24Hour={true}
               display="clock"
               onChange={event => onChangeFunc(event, setBreakStartPicker, setBreakStartTime)}
            />
         )}
         {breakEndPicker && (
            <DateTimePicker
               value={new Date()}
               mode={"time"}
               is24Hour={true}
               display="clock"
               onChange={event => onChangeFunc(event, setBreakEndPicker, setBreakEndTime)}
            />
         )}
   </>
   )
});


const styles = StyleSheet.create({
   scene: {
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
   },
   inputText: {
      fontSize: 14,
      paddingVertical: 4,
      color: 'rgb(196, 197, 194)'
   },
   dayInner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   mapElement: {
      justifyContent: 'center',
      alignItems: 'center'
   },
   mapElementTime: {
      fontSize: 28,
      fontFamily: 'roboto-500',
      color: 'grey'
   },
   carouselInner: {
      position: 'relative',
      alignItems: 'center',
      flex: 1
   },
   halfInner: {
      width: '50%'
   },
   halfInnerContainer: {
      flex: 1,
      flexDirection: 'row'
   },
   selectorStyle: {
      position: "absolute",
      borderWidth: 1,
      borderRadius: 4,
      borderColor: "blue",
      zIndex: -1
   },
   timeBtn: {
      backgroundColor: '#d3fff5',
      paddingVertical: 6,
      paddingHorizontal: 6,
      flex: 1,
      alignItems: 'center'
   },
   timeBtnText: {
      color: 'black',
      fontFamily: 'roboto-500',
      fontSize: 17
   },
   timeInner: {
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'center',
      marginHorizontal: 24,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,.13)',
      borderRadius: 4,
   }
})
