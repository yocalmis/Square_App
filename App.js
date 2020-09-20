import React, { useState } from 'react';
import {Index} from './components/index'
import { useFonts } from 'expo-font';



export default function App() {
  const [loaded] = useFonts({
    'roboto-300': require('./assets/fonts/roboto/Roboto-Light.ttf'),
    'roboto-400': require('./assets/fonts/roboto/Roboto-Regular.ttf'),
    'roboto-500': require('./assets/fonts/roboto/Roboto-Medium.ttf'),
    'roboto-700': require('./assets/fonts/roboto/Roboto-Bold.ttf'),
    'raleway-300': require('./assets/fonts/raleway/Raleway-Light.ttf'),
    'raleway-500': require('./assets/fonts/raleway/Raleway-Medium.ttf'),
    'raleway-700': require('./assets/fonts/raleway/Raleway-Bold.ttf')
  });

  if (!loaded) {
    return null;
  }


  return <Index />;
}
