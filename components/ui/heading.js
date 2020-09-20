import React from 'react'
import { Text, StyleSheet } from 'react-native'

export const Heading = ({ text }) => <Text style={styles.heading}>{text}</Text>

const styles = StyleSheet.create({
  heading: {
    paddingBottom: 4,
    paddingHorizontal: 6,
    marginBottom: 14,
    marginTop: 7,
    fontWeight: 'bold',
    fontFamily: 'raleway-700',
    fontSize: 22,
    borderBottomColor: 'rgba(0, 0, 0, 0.13)',
    borderBottomWidth: 1,
  }
})
