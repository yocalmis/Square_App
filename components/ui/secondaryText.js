import React from 'react';
import { StyleSheet, Text } from 'react-native';


export const SecondaryText = props => {
  return(
    <Text style={{...styles.default, ...props.style}}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-400',
    color: '#726F6F'
  }
});
