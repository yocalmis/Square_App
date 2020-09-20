import React, {useState} from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { ContainedButton, TextButton } from './ui/Buttons'
import Modal from 'react-native-modal';


export const AddCreditCard = ({navigation}) => {
    const [open, setOpen] = useState(false)

    const onChange = form => {
        const {valid} = form
        valid && setOpen(true)
    }

    return (
        <>
            <View style={styles.container}>
                <CreditCardInput onChange={onChange}cardFontFamily={'roboto-400'} />
            </View>
            <Modal 
            isVisible={open}
            onBackButtonPress={() => setOpen(false)}
            onBackdropPress={() => setOpen(false)}
            deviceWidth={Dimensions.get('window').width}
            deviceHeight={Dimensions.get('window').height}
            style={{marginVertical: 0}}
            avoidKeyboard={true}
            useNativeDriver={true}>
                <View style={styles.modalInner}>
                    <View style={styles.modalTitleInner}>
                        <Text style={styles.modalTitle}>Is correct?</Text>
                    </View>
                    
                    <View style={styles.card}>
                        <View style={styles.cardNumber}>
                            <Text style={styles.thinText}>Card number</Text>
                            <Text style={styles.boldText}>5157 5570 2571 9120</Text>
                        </View>
                        <View style={styles.cardDetails}>
                            <View style={styles.cardExpDate}>
                                <Text style={styles.thinText}>Exp. Date</Text>
                                <Text style={styles.boldText}>05/24</Text>
                            </View>
                            <View style={styles.cardCCV}>
                                <Text style={styles.thinText}>CCV</Text>
                                <Text style={styles.boldText}>998</Text>
                            </View>
                        </View>
                        <View style={styles.buttonInner}>
                            <TextButton text={"Cancel"} />
                            <ContainedButton text={"Submit"} />
                        </View>

                    </View>
                </View>
            </Modal>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: 'white'
    },
    modalInner:{
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        paddingHorizontal: 22,
        paddingVertical: 10,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    buttonInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 22
    },
    modalTitleInner: {
        marginBottom: 22,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.13)'
    },
    modalTitle: {
        fontSize: 22,
        fontFamily: 'roboto-500',
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
    },
    thinText: {
        fontFamily: 'roboto-400',
        color: '#999',
        fontSize: 12
    },
    boldText: {
        fontFamily: 'roboto-500'
    }
})

