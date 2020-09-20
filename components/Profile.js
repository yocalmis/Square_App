import React, {useState, useRef, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, useWindowDimensions, Image, Dimensions } from 'react-native';
import { observer } from 'mobx-react'
import Modal from 'react-native-modal';
import ImageZoom from 'react-native-image-pan-zoom';
import { ContainedButton } from './ui/Buttons'
import { Badge } from './ui/badge'
import { PersonelSettings } from './PersonelSettingsElement'
import {ClipBoardPlusIcon, ClipBoardTextIcon, PlusBoxIcon, WalletIcon, CommentTextIcon, CogIcon} from './images/home_icon'
import operations from '../store/fetch';

import { Bookmarks1 } from './Bookmarks1';

const _settingsArr = [
	{
		title: 'Подать объявление',
		iconEl: <ClipBoardPlusIcon size={28} color="#A5A5A5" />,
		where: 'ChangePersonName'
	},
	{
		title: 'Мои объявления',
		iconEl: <ClipBoardTextIcon size={28} color="#A5A5A5" />,
		where: 'ChangePersonName'
	},
	{
		title: 'Добавить резюме',
		iconEl: <PlusBoxIcon size={28} color="#A5A5A5" />,
		where: 'ChangePersonName'
	},
	{
		title: 'Сообщения',
		iconEl: <CommentTextIcon size={28} color="#A5A5A5" />,
	},
	{
		title: 'Добавить карту оплаты',
        iconEl: <WalletIcon size={28} color="#A5A5A5" />,
        where: 'AddCreditCard'
	},
	{
		title: 'Настройки',
		iconEl: <CogIcon size={28} color="#A5A5A5" />,
		where: 'GoToSettings',
	},
]





   const errorFunc = err => {
	 if (Array.isArray(err)) {
	   err.forEach(error => toast.current.show(error, 1000))
	 }
	 else if (typeof err === 'object') toast.current.show(JSON.stringify(err), 1000)
	 else toast.current.show(err, 1000)
   }

export const Profile = observer(({ navigation }) => {
	const {user} = operations
	
	const {width, height} = useWindowDimensions()
	const [open, setOpen] = useState(false)
	const goToAddCard = () => navigation.navigate('AddCreditCard')
	const goToUserInfo = () => navigation.navigate('PersonelInfo')
	const goToSettings = () => navigation.navigate('GoToSettings')
	const goToUser = () => navigation.navigate('User', {goToKabinet: true})
	

	return (
		<>
		<View style={styles.container}>
			<ScrollView>

			<View style={styles.header}>
				<TouchableOpacity onPress={() => setOpen(true)}>
					<View style={styles.imageShadow}>
						<Image 
							style={styles.headerImage} 
							source={require('../assets/images/1.jpg')} />
					</View>
				</TouchableOpacity>

				<View style={styles.headerDesc}>
					<Text style={styles.headerTitleText}>Имя Фамилия</Text>
					<Text style={styles.headerDescText}>Пользователь</Text>
				</View>
				<View style={styles.buttonInner}>
					<ContainedButton onPress={goToUserInfo} text={"Редактировать"} btnStyles={styles.button} txtStyles={styles.buttonText} />
				</View>
			</View>

			{(user && !user.worker) && (
			<View style={styles.content}>
                <Badge text="Businnes" style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 0,
                    marginTop: 6
                }}
                labelStyle={{
                    color: '#6200EE',
                    fontSize: 16
                }}/>
				<PersonelSettings 
					iconEl={<CogIcon size={28} color="#A5A5A5" />}
					title={'Go to businnes account'}
					onPress={()=>operations.business_active({
						user_uuid: operations.uuid,
					 },goToUser,errorFunc)}
					titleStyle={{
						fontSize: 16,
						fontFamily: 'roboto-500'
					}}
				/>
				</View>
				)}


				<View style={styles.content}>

				<Badge text="Actions" style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 0,
                    marginTop: 6
                }}
                labelStyle={{
                    color: '#6200EE',
                    fontSize: 16
                }}/>
				{_settingsArr.map((item, index) => {
                    const {where, iconEl, title, description, onPress} = item
                    const isLastItem = index === _settingsArr.length - 1
					return (
						<PersonelSettings 
							key={index}
							navigation={navigation} 
							iconEl={iconEl}
							title={title}
							description={description}
							where={where}
							onPress={onPress}
							titleStyle={{
								fontSize: 16,
								fontFamily: 'roboto-500'
							}}
							contentStyle={!isLastItem && {
								borderBottomColor: 'rgba(0,0,0,0.07)',
								borderBottomWidth: 1
							}}
						/>
					)
				})}

			</View>

			</ScrollView>
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
							onSwipeDown={() => setOpen(false)}
							maxScale={5}
							>
						<Image style={{width, height:300}}
							source={require('../assets/images/1.jpg')}/>
					</ImageZoom>
				</View>
		</Modal>
		</>
	)
})

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},

	headerImageInner: {
		width: 100,
		height: 100,
		borderRadius: 88,
		backgroundColor: '#FFFFFF',
		marginTop: 40,
		marginBottom: 40,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		alignItems: 'center',
		justifyContent: 'center',

	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 30,
		paddingHorizontal: 24,
		marginTop: 24,
		marginBottom: 24 + 15,
		position: 'relative',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
	},
	pageButton: {
		borderRadius: 6,
		borderColor: '#C4C4C4',
		paddingVertical: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		minWidth: '100%',
		marginBottom: 12,
	},
	pageButtonText: {
		fontFamily: 'roboto-700',
	},
	content: {
        paddingHorizontal: 12,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 12
	},
	headerDesc: {
		marginLeft: 22,

	},
	headerTitleText: {
		fontFamily: 'roboto-500',
		fontSize: 20

	},
	headerDescText: {
		fontFamily: 'roboto-400',
		color: '#999'

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
		overflow: 'visible',

	},
	headerImage: {
		width: 70,
		height: 70,
		borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
	},
	buttonInner: {
		position: 'absolute',
		bottom: -15,
		right: 0,
	},
	button: {
		borderRadius: 16,
		height: 30,
	},
	buttonText: {
		fontSize: 12,
	},

})
