import React, {useState, useRef, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PageButton } from './ui/Buttons'
import { ActionModal } from './ui/ActionModal'

export const Cabinet = ({ navigation }) => {
   const [modalOpen, setModalOpen] = useState(false)
   const closeModalFun = () => setModalOpen(false)

   return (
      <View style={styles.container}>
         <PageButton text="Добавить заведение" onPress={() => navigation.navigate('AddPoint')} />
         
      </View>
   )
}




const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
})