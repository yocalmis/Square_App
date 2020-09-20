import React, {useState, useRef, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, useWindowDimensions } from 'react-native';
import { observer } from 'mobx-react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { History } from './History'
import { Rating } from './Rating'
import { Bookmarks1 } from './Bookmarks1'
import { Bookmarks2 } from './Bookmarks2'



const FirsRoute = () => {
    return <View style={{flex: 1}} ></View>
}
const SecondRoute = () => {
    return <View style={{flex: 1}} ></View>
}
const ThirdRoute = () => {
    return <View style={{flex: 1}} ></View>
}
const FourthRoute = () => {
    return <View style={{flex: 1}} ></View>
}

export const Bookmarks = observer(({ navigation }) => {
	const { width, height } = useWindowDimensions()
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'favorite', title: 'Избранное'.toUpperCase() },
      { key: 'notice', title: 'Уведомления'.toUpperCase() },
      { key: 'history', title: 'История'.toUpperCase() },
      { key: 'rating', title: 'Рейтинг'.toUpperCase() },
    ]);
	const renderScene = ({ route }) => {
		switch (route.key) {
			case 'favorite':
				return <Bookmarks1 />;
			case 'notice':
				return <Bookmarks2 />;
			case 'history':
				return <History navigation={navigation} />;
			case 'rating':
				return <Rating navigation={navigation} />;
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
					return (
                        <TabBar
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
                            tabStyle={{width: 'auto'}} />
                    )
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
})

