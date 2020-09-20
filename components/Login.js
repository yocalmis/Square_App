import React, {useRef, useEffect, useState, createRef} from 'react'
import { TextInput, View, StyleSheet, StatusBar, Text, KeyboardAvoidingView, Platform, ScrollView,
TouchableOpacity,TouchableHighlight, UIManager } from 'react-native';
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


export const Login = observer(({navigation}) => {
  const {validableInputs, screenWidth} = store
  const {loginInputs} = validableInputs
  const animation = useRef(null)
  const toast = useRef(null)
  const password = createRef(null)
  const username = createRef(null)
  const [usernameText, setUsernameText] = useState(null)
  const [passwordText, setPasswordText] = useState(null)
  const goToRegister = () => navigation.navigate('Register')
  const goToForgotPass = () => navigation.navigate('ForgotPass')
  const { userNameRegexp, passwordRegexp, email } = regexps
  
  const goToApp = () => {
    console.log('girdim')
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

  const formData = {
    login: 'mr.mix0000@gmail.com',
    password: '@Minepass123'
  }
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)


  const loginFunc = () => {
    if (Object.values(loginInputs).includes(false)) {return;}


    operations.login({
      login: usernameText,
      password: passwordText
    }, goToApp, errorFunc)
  }


  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{flex: 1}} enabled>
          <ScrollView  contentContainerStyle={{flex: 1}}>
            <View style={styles.container}>


              <View style={styles.headerInner}>
                <Text style={styles.header}>Войти</Text>
              </View>

              <View style={styles.inner}>
                <TouchableOpacity onPress={goToRegister}>
                  <Text style={{fontSize: 15,color:"#000000",fontFamily: "roboto-400"}}>
                    <SecondaryText style={{fontSize: 15,color:"#acadad",height:33,fontFamily: "roboto-400"}}>
                      У вас нет аккаунта? 
                    </SecondaryText> 
                    {' '} Зарегистрироваться
                  </Text>
                </TouchableOpacity>
                <View style={styles.inputs}>
                  <ValidableInput style={{...styles.input}}
                    ref={username}
                    placeholder="Почта"
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    regExp={email}
                    errorMesage="Пожалуйста, введите правильную почту."
                    returnKeyType='next'
                    onSubmitEditing={() => password.current.focus()}
                    id="username"
                    group={"loginInputs"}
                    blurOnSubmit={false}
                    placeholderTextColor="#B3B0B0"
                    textUpdateHandler={setUsernameText}
                  />
                  
                  <ValidableInput style={{...styles.input}}
                    ref={password}
                    regExp={passwordRegexp}
                    placeholder="Введите пароль"
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    errorMesage="Пожалуйста, введите правильный пароль."
                    secureTextEntry={true}
                    returnKeyType='send'
                    onSubmitEditing={loginFunc}
                    id="password"
                    group={"loginInputs"}
                    textUpdateHandler={setPasswordText}
                    placeholderTextColor="#B3B0B0"
                    />
                    <TouchableOpacity onPress={goToForgotPass}>
                      <Text style={{...styles.mb_16, textAlign: 'right',color:"#C1C1C1"}}>Забыли пароль?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={loginFunc} style={styles.loginBtn}>
                  <Text style={styles.loginBtnText}>Войти</Text>
                </TouchableOpacity>
              </View>
              <Text style={{...styles.smallText}}>При входе вы соглашаетесь с Условиями использования приложения</Text>
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    </>
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
    paddingHorizontal: '5%',
    marginTop: 'auto'
  },
  setDefFont: {
    fontFamily: 'roboto-400',
  },
  inputs: {
    marginVertical: 16,
  },
  input: {
    height: 50,
    minWidth: '100%',
    maxWidth: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  mb_16: {
    marginBottom: 16
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
