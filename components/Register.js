import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View, StyleSheet, Image, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SecondaryText } from './ui/secondaryText';
import { Button } from './ui/Buttons';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import store from '../store/store';
import operations from '../store/fetch'
import {ValidableInput} from './validationInput.js'
import {regexps} from '../store/regexps'
import Toast from 'react-native-toast-message'
import { NavigationActions } from 'react-navigation';

const { screenWidth, screenHeight } = store

export const Register = observer(({navigation}) => {
  const { validableInputs } = store
  const { validInputs } = validableInputs
  const toast = useRef(null)
  const name = useRef(null)
  const username = useRef(null)
  const password = useRef(null)
  const passwordRepeat = useRef(null)
  const [usernameText, setUsernameText] = useState(null)
  const [passwordText, setPasswordText] = useState(null)
  const [passwordTextRep, setPasswordTextRep] = useState(null) 
  const [nameText, setNameText] = useState(null)
  const { nameRegexp, userNameRegexp, passwordRegexp, email } = regexps

  const goToIndex = () => navigation.navigate('Login')
  const goToApp = () => {
    console.log('giriş yapıldı')
  }

  const showErroToast = ({ text }) => {
    return Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Ошибка',
      text2: text,
      bottomOffset: 50,
    })
  }


  const errorFunc = err => {
    if (Array.isArray(err)) {
      console.log('array error', err)
      err.forEach(error => showErroToast({text: error}))
    }
    else showErroToast({text: err})
  }

  const registerFunc = () => {
    if (Object.values(validInputs).includes(false)) {return;}
    console.log(validInputs)


    operations.register({
      name: nameText,
      login: usernameText,
      password: passwordText
    }, goToApp, errorFunc)


  }


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={{flex: 1}} enabled>
      <ScrollView  contentContainerStyle={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.headerInner}>
                <Text style={styles.header}>Регистрация</Text>
            </View>
            <View style={styles.inner}>
              <View style={styles.inputs}>
                <ValidableInput style={{...styles.input}}
                  ref={username}
                  placeholder="Почта"
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  autoCompleteType={'email'}
                  regExp={email}
                  errorMesage="Please fill the user name correctly."
                  warningMessage="6 - 20 characters"
                  returnKeyType='next'
                  onSubmitEditing={() => password.current.focus()}
                  id="username"
                  group={"validInputs"}
                  blurOnSubmit={false}
                  keyboardType={'email-address'}
                  placeholderTextColor="#BCBDBD"
                  textUpdateHandler={setUsernameText}
                 />
                <ValidableInput style={{...styles.input}}
                  ref={password}
                  regExp={passwordRegexp}
                  placeholder="Новый пароль"
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  errorMesage="Пожалуйста, введите правильный пароль."
                  warningMessage="Min. 1 digit, Min. 1 uppercase letter"
                  secureTextEntry={true}
                  returnKeyType='next'
                  onSubmitEditing={() => passwordRepeat.current.focus()}
                  id="password"
                  group={"validInputs"}
                  blurOnSubmit={false}
                  placeholderTextColor="#BCBDBD"
                  textUpdateHandler={setPasswordText}
                 />
                <ValidableInput style={styles.input}
                  ref={passwordRepeat}
                  regExp={passwordRegexp}
                  placeholder="Повторите пароль"
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                  errorMesage="Пожалуйста, введите правильный пароль."
                  returnKeyType='go'
                  linkedEl={password}
                  onSubmitEditing={registerFunc}
                  id="passwordRepeat"
                  group={"validInputs"}
                  placeholderTextColor="#BCBDBD"
                  textUpdateHandler={setPasswordTextRep}
                 />
              </View>
                <TouchableOpacity onPress={goToIndex}>
                  <Text style={{fontSize: 15,color:"#000000",fontFamily: "roboto-400"}}>
                      <SecondaryText style={{fontSize: 15,color: "#acadad",height:33,fontFamily: "roboto-400"}}>
                      Уже есть аккаунт?
                      </SecondaryText> 
                      {' '} Войдите
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={registerFunc} style={styles.loginBtn}>
                    <Text style={styles.loginBtnText}>Зарегистрироваться</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.smallText}>При входе вы соглашаетесь с Условиями использования приложения.</Text>
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
})



const styles = StyleSheet.create(toJS({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
  inner: {
    marginTop: 24,
    paddingVertical: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginTop: 'auto'
  },
  inputs: {
    marginVertical: 16
  },
  input: {
    height: 50,
    minWidth: '100%',
    maxWidth: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  loginBtn: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor : "#424B52",
    marginTop :10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
    flexDirection: 'row',
  },
  loginBtnText: {
    color: 'white',
    fontFamily: 'roboto-500',
    fontSize: 18
  },
  smallText: {
    fontSize: 11,
    textAlign: 'center',
    paddingVertical: 22,
    marginTop: 'auto'
  },
  error: {
    fontSize: 12,
    paddingHorizontal: 10,
    color: 'red'
  },
  header: {
    fontSize: 28,
    fontFamily: 'roboto-700',
    color: '#39434C'
  },
  headerInner: {
    paddingLeft: 20,
    marginTop: 'auto'
  }
}));
