import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, Dimensions, ScrollView, useWindowDimensions, TouchableOpacityBase } from 'react-native';
import { ContainedButton, FloatButton } from '../ui/Buttons'
import operations from '../../store/fetch'
import {observer} from 'mobx-react'
import {ValidableInput} from '../validationInput'
import ImageZoom from 'react-native-image-pan-zoom';
import Modal from 'react-native-modal';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AddPaperIcon, PhoneIcon, MailIcon, DateIcon, GenderIcon, UserIcon} from '../images/home_icon'
import { PersonelSettings } from '../PersonelSettingsElement'
import { ActionModal } from '../ui/ActionModal'
import { set } from 'react-native-reanimated';



export const PersonelInfo = ({navigation}) => {

	const [open, setOpen] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)
	const [changeGenderModal, setChangeGenderModal] = useState(false)
	const [date, setDate] = useState(new Date(Date.now()))
	const {owner} = operations
	const {width, height} = useWindowDimensions()
	const username = useRef(null)
	const [show, setShow] = useState(false)
	useEffect(()=> console.log(show), [show])
	const onChange = (event, selectedDate) => {
		setShow(false)
		const {type, nativeEvent} = event
		if (nativeEvent && nativeEvent.timestamp) {
			const currentDate = new Date(nativeEvent.timestamp)
			setDate(currentDate)
		}
	};
	const showDatePicker = () => setShow(true)
	const closeModalFun = () => setModalOpen(false)

	const _settingsArr = [
		{
			title: 'Lookarious',
			description: 'Name Surname',
			iconEl: <UserIcon size={24} color="#C4C4C4" />,
			where: 'ChangePersonName'
		},
		{
			title: '+90 (551) 163 17-88',
			description: 'Phone number',
			iconEl: <PhoneIcon size={24} color="#C4C4C4" />,
			where: 'ChangePersonName'
		},
		{
			title: 'mr.mix0000@gmail.com',
			description: 'E-mail',
			iconEl: <MailIcon size={24} color="#C4C4C4" />,
			where: 'ChangePersonName'
		},
		{
			title: '21.10.2000',
			description: 'Birthdate',
			iconEl: <DateIcon size={24} color="#C4C4C4" />,
			where: null,
			onPress: showDatePicker
		},
		{
			title: 'Tap to change',
			description: 'Gender',
			iconEl: <GenderIcon size={24} color="#C4C4C4" />,
			where: null,
			onPress: () => setChangeGenderModal(true)
		},
		{
			title: 'Tap to add',
			description: 'ИНН',
			iconEl: <AddPaperIcon size={24} color="#C4C4C4" />,
			where: 'ChangePersonName',
		},
	]
	return (
		<>
		<ScrollView contentContainerStyle={{ minHeight: height }}>
		
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => setOpen(true)}>
					<View style={styles.imageShadow}>
						<Image 
						style={styles.headerImage} 
						source={require('../../assets/images/1.jpg')} />
					</View>
				</TouchableOpacity>
				<FloatButton 
				btnStyles={styles.headerBtn} 
				onPress={() => setModalOpen(true)}
				children={<SimpleLineIcons name="camera" size={16} color="white" />} />
			</View>
			<View style={styles.inner}>
				{_settingsArr.map((item, index) => {
					const {where, iconEl, title, description, onPress} = item
					return (
						<PersonelSettings 
							key={index}
							navigation={navigation} 
							iconEl={iconEl}
							title={title}
							description={description}
							where={where}
							onPress={onPress}
						/>
					)
				})}
			</View>
			<View style={{...styles.inner, ...styles.innerDesciption}}>
				<SimpleLineIcons name="exclamation" size={24} color="#FF453A" style={styles.innerDesciptionIcon} />
				<Text style={styles.innerDesciptionText}>Tap to element which you want to change. </Text>
			</View>
		</View>
		<Modal 
			isVisible={open}
			onBackButtonPress={() => setOpen(false)}
			deviceWidth={width}
			deviceHeight={height}
			style={{margin: 0}}
			animationIn="fadeIn"
			animationOut="fadeOut"
			backdropOpacity={0.9}
			useNativeDriver={true}>
				<View style={{flex: 1}}>
					<ImageZoom cropWidth={width}
							cropHeight={height}
							imageWidth={width}
							imageHeight={300}
							enableSwipeDown={true}
							useNativeDriver={true}
							swipeDownThreshold={1}
							onSwipeDown={() => setOpen(false)}
							maxScale={5}
							>
						<Image style={{width, height:300}}
							source={require('../../assets/images/1.jpg')}/>
					</ImageZoom>
				</View>
		</Modal>

		</ScrollView>
		{show && (
			<DateTimePicker
				testID="birthday"
				value={date}
				mode={"date"}
				is24Hour={true}
				display="spinner"
				onChange={onChange}
			/>
		)}
		<ActionModal 
		open={modalOpen}
		closeFunc={closeModalFun} 
		buttons={[
			{
				text: 'Добавить фото',
				onPress: () => console.log('Добавить фото')
			},
			{
				text: 'Сделать фото',
				onPress: () => console.log('Сделать фото')
			},
			{
				text: 'Удалить',
				onPress: () => console.log('Удалить'),
				type: 'warning'
			},
		]} />
		<ActionModal 
		open={changeGenderModal}
		closeFunc={() => setChangeGenderModal(false)} 
		description="Выберите пол"
		buttons={[
			{
				text: 'Женщина',
				onPress: () => console.log('Женщина')
			},
			{
				text: 'Мужчина',
				onPress: () => console.log('Мужчина')
			},
		]} />
		</>
	);
};



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F1F1F1'
	},
	inputStyle: {
		height: 40,
		backgroundColor: 'white',
		borderRadius: 6,
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.13)',
		fontFamily: 'roboto-400'
	},
	header: {
		paddingVertical: 22,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		position: 'relative'
	},
	headerImage: {
		width: 140,
		height: 140,
		borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
		
	},
	imageShadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.40,
		shadowRadius: 1.41,
		elevation: 2,
		borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
		marginBottom: 16,
		overflow: 'visible',
	},
	raisedBtn: {
		backgroundColor: '#40A8F2',
		width: 45,
		height: 45,
	},
	description: {
		color: '#999999',
		fontFamily: 'roboto-400',
		fontSize: 12
	},
	inner: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.00,
		elevation: 1,
		paddingHorizontal: 12,
		backgroundColor: 'white',
		marginBottom: 22,
		justifyContent: 'center',
		paddingVertical: 12
	},
	settingsInner: {
		paddingVertical: 12,
		flexDirection: 'row',
		alignItems: 'center'
	},
	iconInner: {
		marginRight: 12,
		paddingHorizontal: 12
	},
	title: {
		fontFamily: 'roboto-400',
		color: '#212324'
	},
	innerDesciption: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingVertical: 16
	},
	innerDesciptionText: {
		fontFamily: 'roboto-400',
		color: '#999999',
		fontSize: 15
	},
	innerDesciptionIcon: {
		marginRight: 12,
		paddingHorizontal: 12
	},
	headerBtn: {
		position: 'absolute',
		backgroundColor: '#6200EE',
		width: 40,
		height: 40,
		right: (Dimensions.get('window').width / 2) - 60,
		bottom: 40
	}
})
