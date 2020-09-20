import React, { useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, StatusBar } from 'react-native';
import store from '../../store/store'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Heading } from '../ui/heading'
import { ActionButton  } from '../ui/Buttons'


const pageButtons = [
  {
    title: 'Edit Personel Info',
    icon: <MaterialIcons name="person-outline" size={24} color="black" />,
    navigate: 'PersonelInfo'
  },
  {
    title: 'Add Point',
    icon: <MaterialIcons name="add-location" size={24} color="black" />,
    navigate: 'AddPoint'
  },
  {
    title: 'Add Point',
    icon: <AntDesign name="creditcard" size={24} color="black" />,
    navigate: 'AddCreditCard'
  }
]

export const Actions = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.main}>
        <Heading text="Actions" />
        {pageButtons.map(({title, icon, navigate}, i) => {
          return <ActionButton
            key={Date.now() + i}
            text={title}
            icon={icon}
            navigation={navigation}
            navigate={navigate}
           />
        })}
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 12,
    marginTop: StatusBar.currentHeight
  }
})
