import React, { useRef, useState, forwardRef, useEffect} from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native'
import {observer} from 'mobx-react'
import store from '../store/store'

export const ValidableInput = observer(forwardRef((props, ref) => {
  const { regExp, errorMesage, warningMessage, linkedEl, id, group, textUpdateHandler } = props
  const validInputs = store.validableInputs[group]
  const isValid = validInputs[id]
  const [value, updateValue] = useState(null)
  const [isFocusedBefore, setIsFocusedBefore] = useState(false)

  const setIsValid = status => store.changeValidInput(id, status, group)

  const onChangeText = text => {
    updateValue(text)
    textUpdateHandler && textUpdateHandler(text)
    ref && ref.current && (ref.current.lastNativeText = text)

    const isValid = linkedEl ? (text.match(regExp) && linkedEl.current.lastNativeText === text) : text.match(regExp)
    
    setIsValid(isValid)
  }
  
  const marginBottom = (!isValid && isFocusedBefore && errorMesage) ? 12 : 16
  return (
    <>
      <TextInput {...props}
        ref={ref}
        onChangeText={onChangeText}
        onFocus={() => setIsFocusedBefore(true)}
        value={value}
        style={{...props.style, marginBottom }}
       />
      {(errorMesage && !isValid && isFocusedBefore) &&
        <View style={styles.textInner}>
          <Text style={styles.error}>{errorMesage}</Text>
        </View>
      }
      {(warningMessage && isFocusedBefore && !isValid) &&
        <View style={styles.textInner}>
          <Text style={styles.warning}>{warningMessage}</Text>
        </View>
      }
    </>
  )
}))

const styles = StyleSheet.create({
  default: {
    height: 48,
    backgroundColor: '#EAEDED',
    borderRadius: 8,
  },
  error: {
    flexShrink: 1,
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    paddingHorizontal: 10
  },
  warning: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#457ABB',
    fontSize: 12,
    marginBottom: 8,
    paddingLeft: 10
  },
  textInner: {
    flexDirection:'row'
  }
})
