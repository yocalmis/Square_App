import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';


export const PersonelSettings = ({navigation, where, iconEl, title, description, onPress, titleStyle, contentStyle, textInnerStyle}) => {
	return (
		<TouchableOpacity onPress={() => {
			where && navigation.navigate(where)
			onPress && onPress()
		}}>
			<View style={{...styles.settingsInner, ...contentStyle}}>
				<View style={styles.iconInner}>
					{iconEl}
				</View>
				<View style={{...styles.textInner, ...textInnerStyle}}>
					<Text style={{...styles.title, ...titleStyle}}>{title}</Text>
					{description && <Text style={styles.description}>{description}</Text>}
				</View>
			</View>
		</TouchableOpacity>
	)
};

const styles = StyleSheet.create({
	description: {
		color: '#999999',
		fontFamily: 'roboto-400',
		fontSize: 12
	},
	settingsInner: {
		paddingVertical: 12,
		flexDirection: 'row',
        alignItems: 'center',
	},
	iconInner: {
		marginRight: 12,
		paddingHorizontal: 12
	},
	title: {
		fontFamily: 'roboto-400',
		color: '#212324'
    },
    textInner: {
        flex: 1
    }

})
