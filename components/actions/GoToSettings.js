import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {PersonelSettings} from '../PersonelSettingsElement'
import {CommentsIcon, WarningCircleIcon, NewsIcon, BellIcon, SecurityIcon, OffIcon} from '../images/home_icon'
import operations from '../../store/fetch'

const _settingsArr = [
	{
		title: 'Служба поддержки',
		iconEl: <CommentsIcon size={28} color="#C4C4C4" />,
		where: null
	},
	{
		title: 'Удалить профиль',
		iconEl: <WarningCircleIcon size={28} color="#C4C4C4" />,
		where: null
	},
	{
		title: 'Изменить пароль',
		iconEl: <NewsIcon size={28} color="#C4C4C4" />,
		where: null
	},
	{
		title: 'Уведомления',
		iconEl: <BellIcon size={28} color="#C4C4C4" />,
	},
	{
		title: 'Безопасность',
		iconEl: <SecurityIcon size={28} color="#C4C4C4" />,
	},
	{
		title: 'Выйти',
        iconEl: <OffIcon size={28} color="#C4C4C4" />,
		where: null,
		onPress: () => operations.logout()
	},
]

export const GoToSettings = ({navigation}) => {

	return (
		<View style={styles.container}>
		
			<View style={styles.settingsInner}>
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

		
		</View>
	);
};





const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	
	settingsInner: {

	},
	
})
