import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ContainedButton, TextButton } from '../ui/Buttons'



export const StepButtons = ({activeStep, length, backFunc, nextFunc, routes, noValidate, lastFunc}) => {

    const isLast = length - 1 === activeStep || length === activeStep
    const isFirst = activeStep === 0
    
 
    const nextHandler = () => {
      if (isLast) {
         lastFunc()
         return;
      }
       if (noValidate) nextFunc()
       else routes[activeStep] ? nextFunc() : null
    }
 
    return (
       <View style={styles.stepBtnConatiner}>
          <TextButton text="Back" onPress={backFunc} disabled={isFirst ? true : false } />
          <ContainedButton text={isLast ? 'Finish': 'Next'} onPress={nextHandler} btnStyles={{marginRight: 0}}/>
       </View>
    )
 }


 const styles = StyleSheet.create({
   stepBtnConatiner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
      marginTop: 'auto',
      paddingVertical: 12
   },
})