import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {Main} from './Main'
import {Login} from './Login'
import {Register} from './Register'
import {ForgotPass} from './ForgotPass'



export const Navigator = createAppContainer(createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      headerShown: false,
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  },
  ForgotPass: {
    screen: ForgotPass,
    navigationOptions: {
      headerShown: false,
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  },
  Main: {
    screen: Main,
    navigationOptions: {
      headerShown: false,
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  }
}))
