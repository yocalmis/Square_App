import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal';


export const ActionModal = ({open, closeFunc, buttons, title, description, animationIn, animationOut, backdropOpacity,
callBackFunc }) => {
	 const {width, height} = useWindowDimensions()
	 const triggerCallback = index => callBackFunc && callBackFunc(index)
    return (
        <Modal 
			isVisible={open}
			onBackButtonPress={() => closeFunc()}
			onBackdropPress={() => closeFunc()}
			deviceWidth={width}
			deviceHeight={height}
			style={{margin: 0, marginTop: -20}}
			animationIn={animationIn || 'slideInUp'}
			animationOut={animationOut || 'slideOutDown'}
			backdropOpacity={backdropOpacity || 0.6}
			useNativeDriver={true}>
				<View style={styles.modalInner}>
                    {(title || description) && (
                        <View style={styles.modalInnerHeader}>
                            {title && <ModalTitle text={title} />}
                            {description && <ModalDescription text={description} />}
                        </View>
                    )}

                    {buttons.map((button, index) => {
                        const {text, type, onPress} = button
                        const isLastChild = index === buttons.length - 1
                        return <ModalButton key={index} text={text} type={type} onPress={() => {
									triggerCallback(index) 
									onPress && onPress()
									closeFunc()
								}} isLastChild={isLastChild} />
                    })}
				</View>
				<View style={{...styles.modalInner, ...styles.modalInnerFooter}}>
					<ModalButton text="Отмена" type="close" onPress={closeFunc} />
				</View>
		</Modal>
    )
};


const ModalButton = ({onPress, text, type, isLastChild}) => {
	return(
		<TouchableOpacity 
			onPress={() => onPress()}
			style={{...styles.modalBtn, 
				...(type && styles[`modalBtn_${type}`]), ...(isLastChild && {borderBottomWidth: 0})}}>
			<Text style={{...styles.modalBtnTxt, 
				...(type && styles[`modalBtnTxt_${type}`])}}>{text}</Text>
		</TouchableOpacity>
	)
}
const ModalTitle = ({text}) => {
	return(
		<View style={styles.modalInnerTitleInner}>
            <Text style={styles.modalInnerTitle}>{text}</Text>
        </View>
	)
}
const ModalDescription = ({text}) => {
	return(
		<View style={styles.modalInnerDescriptionInner}>
            <Text style={styles.modalInnerDescription}>{text}</Text>
        </View>
	)
}



const styles = StyleSheet.create({
	modalInner: {
		backgroundColor: '#D4D4D7',
		position: 'absolute',
		bottom: 64+12,
		right: 12,
		left: 12,
		borderRadius: 14,
		overflow: 'hidden',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.00,
		elevation: 1,
	},
    modalInnerFooter: {
        bottom: 12,
    },
	modalBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 13,
		borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.07)',
	},
	modalBtnTxt: {
        fontFamily: 'roboto-400',
		fontSize: 18,
		color:'#007AFF'
	},
    modalBtn_close: {
        backgroundColor: 'white'
    },
	modalBtnTxt_close: {
        fontFamily: 'roboto-500'
	},
	modalBtnTxt_warning: {
		color:'#FF3B30'
    },
    modalInnerHeader: {
        justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 13,
		borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.07)',
    },
    modalInnerTitle: {
        fontSize: 16,
        fontFamily: 'roboto-500',
        color: '#8F8F8F'
    },
    modalInnerDescriptionInner: {
        paddingHorizontal: 16
    },
    modalInnerDescription: {
        fontSize: 13,
        fontFamily: 'roboto-400',
        color: '#8F8F8F'
    }
})
