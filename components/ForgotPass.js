import React from 'react'
import { TextInput, View, StyleSheet, Image, Text, KeyboardAvoidingView, Platform, ScrollView,
TouchableOpacity } from 'react-native';
import { SecondaryText } from './ui/secondaryText';
import { Button } from './ui/Buttons';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import store from '../store/store';

const { screenWidth, screenHeight } = store
export const ForgotPass = observer(({navigation}) => {
  const goToRegister = () => navigation.navigate('Register')
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{flex: 1}} enabled>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                style={{
                  width: screenWidth,
                  height: (screenHeight * 50) / 100,
                  resizeMode: 'stretch'
                }}
                source={require('../assets/header-bg.png')} />
            </View>
            <View style={styles.inner}>
              <TouchableOpacity onPress={goToRegister}>
                <Text>
                  <SecondaryText>Don’t have an Account?</SecondaryText> Sign Up Now
                </Text>
              </TouchableOpacity>
              <View style={styles.inputs}>
                <TextInput style={{...styles.input}}
                  placeholder="E-Mail" keyboardType="email-address"
                  autoCorrect={false}
                  autoCompleteType={'email'}
                  autoCapitalize={'none'}
                  placeholderTextColor="#BCBDBD"
                 />
              </View>
              <Button text="Send me new password"></Button>
            </View>
          </View>
      </ScrollView>
  </KeyboardAvoidingView>
  );
})



const styles = StyleSheet.create(toJS({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: screenHeight
  },
  inner: {
    marginTop: 24,
    paddingVertical: 16,
    flex: 1,
    alignItems: 'center',
    width: '65%'
  },
  setDefFont: {
    fontFamily: 'roboto-400',
  },
  inputs: {
    marginVertical: 16
  },
  input: {
    height: 36,
    minWidth: '85%',
    maxWidth: '85%',
    backgroundColor: '#EAEDED',
    borderRadius: 8,
    paddingHorizontal: 10
  },
  loginBtn: {
    marginBottom: 16
  },
  smallText: {
    marginTop: 'auto',
    fontSize: 9,
    textAlign: 'center'
  }
}));
