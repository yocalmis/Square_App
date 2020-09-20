import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, FlatList} from 'react-native';
import operations from '../store/fetch'
import {observer} from 'mobx-react'
import { ContainedButton, FloatButton } from './ui/Buttons'
import Entypo from 'react-native-vector-icons/Entypo';
import Star from 'react-native-star-view';
import { TouchableOpacity } from 'react-native-gesture-handler';




const ShortMapElement = ({image, title, rating, uuid, onPress}) => {
	const image_link = image ? image.original : 'https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png'


	return (
		<TouchableOpacity style={styles.shortElInner} onPress={onPress}>
			<View style={styles.shortElInnerLeftSide}>
				<View style={styles.shortElInnerImageInner}>
					<Image style={styles.shortElInnerImage} source={{uri: image_link }} />
				</View>
				<View style={styles.shortElTextInner}>
					<Text style={styles.shortElHeader}>{title}</Text>
					<View style={styles.rating}>
						<Text style={styles.secondaryText}>{rating.stars}</Text>
						<Star score={rating.stars} style={styles.starStyle} />
						<Text style={styles.secondaryText}>({rating.count})</Text>
					</View>
				</View>
			</View>
			<Entypo name="chevron-small-right" size={24} color="grey" />
		</TouchableOpacity>
	)
}


export const Locks = observer(({navigation}) => {


	const getPlaces = navigation.getParam('getPlaces', false)
	
	const { user, business_info, business_entities } = operations
	const { title, avatar_img, about } = business_info || {}
	
	async function getBusinnesThings() {
		await operations.getBusinnesEntity()
		await operations.getBusinnesInfo()
	}
	
	useEffect(() => {
		user && getBusinnesThings()
	}, [user])

	useEffect(() => {
		if(getPlaces) operations.getPlaces()
	}, [getPlaces])



	const goToProduct = uuid => navigation.navigate('Product', {uuid, fromBusinnes: true})

	const renderItem = ({item}) => {
	
		const {image, title, rating, uuid} = item
	
		return <ShortMapElement image={image} title={title} rating={rating} onPress={() => goToProduct(uuid)} />
	}

	return (
		<View style={styles.container}>
			{business_info && (
			<View style={styles.header}>
				<TouchableOpacity onPress={() => null}>
					<View style={styles.imageShadow}>
						<Image 
							style={styles.headerImage} 
							source={{uri: avatar_img ? avatar_img : 'https://img.icons8.com/fluent/344/link-company-parent.png'}} />
					</View>
				</TouchableOpacity>

				<View style={styles.headerDesc}>
					<Text style={styles.headerTitleText}>{title}</Text>
					{about && <Text style={styles.headerDescText}>{about}</Text>}
				</View>
				<View style={styles.buttonInner}>
					<ContainedButton onPress={() => null} text={"Редактировать"} btnStyles={styles.button} txtStyles={styles.buttonText} />
				</View>
			</View>
			)}
			{business_entities && (
				<View style={{flex: 1}}>
					<FlatList
						data={business_entities}
						renderItem={renderItem}
						keyExtractor={item => item.uuid}
						maxToRenderPerBatch={10}
						removeClippedSubviews={true}
						initialNumToRender={business_entities.length}
					/>
				</View>
			)}
			
		</View>
	);
})





const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
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
	headerDesc: {
		marginLeft: 22,
	},
	headerTitleText: {
		fontFamily: 'roboto-500',
		fontSize: 20,
		color: 'black'
	},
	shortElHeader: {
		fontFamily: 'roboto-500',
		color: 'black'
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
		padding: 10
	},
	headerImage: {
		width: 60,
		height: 60,
		borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
		resizeMode: 'contain'
	},
	button: {
		borderRadius: 16,
		height: 30,
	},
	buttonText: {
		fontSize: 12,
	},
	buttonInner: {
		position: 'absolute',
		bottom: -15,
		right: 0,
		zIndex: 2
	},
	rating: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	secondaryText: {
		color: 'grey'
	},
	starStyle: {
		width: 70,
		height: 15,
		marginHorizontal: 4
	},
	shortElInner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 16,
		paddingHorizontal: 16
	},
	shortElInnerImageInner: {
		marginRight: 12,
	},
	shortElInnerImage: {
		width: 50,
		flex: 1,
		borderRadius: 4,
		resizeMode: 'cover'
	},
	shortElInnerLeftSide: {
		flexDirection: 'row'
	}
})
