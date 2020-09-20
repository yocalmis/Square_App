import React from 'react'
import {View, StyleSheet, Modal, ActivityIndicator} from 'react-native'
import operations from '../store/fetch'
import {observer} from 'mobx-react'


export const WaitingModal = observer(() => {
  const { state } = operations
  const status = state === 'loading' ? true : false
  return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={status}
      >
        <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,.7)'
  },
});
