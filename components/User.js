import React, {useState, useRef, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, useWindowDimensions, Image, Dimensions } from 'react-native';
import { observer } from 'mobx-react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {Profile} from './Profile'
import { Cabinet } from './cabinet'



const FourthRoute = () => {
    return <View style={{flex: 1}}></View>
}

export const User = observer(({ navigation }) => {
	const { width, height } = useWindowDimensions()
	const [index, setIndex] = useState(0);
	const goToKabinet = navigation.getParam('goToKabinet', 0)
    const [routes] = useState([
      { key: 'profile', title: 'Профиль'.toUpperCase() },
      { key: 'arenda', title: 'Аренда'.toUpperCase() },
      { key: 'kabinet', title: 'Кабинет'.toUpperCase() },
      { key: 'sotrudnik', title: 'Сотрудник'.toUpperCase() },
	]);
	useEffect(() => {
		if(goToKabinet) setIndex(2)
	}, [goToKabinet])
	const renderScene = ({ route }) => {
		switch (route.key) {
			case 'profile':
				return <Profile navigation={navigation} />;
			case 'arenda':
				return <FourthRoute />;
			case 'kabinet':
				return <Cabinet navigation={navigation} />;
			case 'sotrudnik':
				return <FourthRoute />;
			default:
				return null;
		}
	};
	return (
		<View style={styles.container}>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width, height }}
				renderTabBar={props => {
					return (<TabBar
						{...props}
						activeColor={'#6200EE'}
						inactiveColor={'#737673'}
						scrollEnabled
						style={{ backgroundColor: 'white', marginBottom: 4 }}
						indicatorStyle={{
							backgroundColor: '#6200EE',
							borderTopLeftRadius: 3,
							borderTopRightRadius: 3,
							height: 3,
						}}
						tabStyle={{width: 'auto'}}
						
					/>)
				}}
	
			/>

		</View>


	)
})


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		marginBottom: -16,
		paddingBottom: 16
	},
	
	slidemain: {
	  flex: 1,
	  marginTop:10,
	  backgroundColor:"#FFFFFF"
   },
})

