import React, {useState, useRef, useEffect} from 'react'
import { View, Text, StyleSheet, useWindowDimensions, ScrollView, StatusBar, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Star from 'react-native-star-view';




const _reviews = [
    {
        id: 2131,
        title: 'Хостел “Дежавю”',
        totalReviews: 23,
        image: require('../assets/images/user.png'),
        countReviews: 5,
        review: 'Отличный хостел,хорошу отдохнули и главное комфортно!!!',
        address: 'Толе би, Алматы',
        date: '29 июня 2020',
    },
    {
        id: 123,
        title: 'Кафе ”Турист”',
        totalReviews: 23,
        image: require('../assets/images/user.png'),
        countReviews: 3.5,
        review: 'Отличныое меню, но администратор ошибся заказом, а так хорошее место для семейного отдыха, всей семьёй)',
        address: 'Проспект Достык, Алматы',
        date: '25 июня 2020',
    },
]


const FirsRoute = () => {
    return <View style={{flex: 1}} >
        {_reviews.map(el => {
            const { title, countReviews, review, date, image, address, totalReviews, id } = el
            return (
                <RatingElement 
                    key={id}
                    title={title}
                    countReviews={countReviews}
                    review={review}
                    date={date}
                    image={image}
                    address={address}
                    totalReviews={totalReviews}
                />
            )
        })}
    </View>
}
const SecondRoute = () => {
    return <View style={{flex: 1}} ></View>
}


const RatingElement = ({ title, countReviews, review, date, image, address, totalReviews }) => {
    return (
        <View style={styles.elContainer}>
            <View style={styles.header}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.headerImageInner}>
                        <Image source={image} style={styles.headerImage}/>
                    </View>
                    <View style={styles.headerTextInner}>
                        <Text style={styles.elTitle}>{title}</Text>
                        <Text style={styles.smallText}>{totalReviews} отзывов</Text>
                    </View>
                </View>
                <View style={styles.headerStarsInner}>
                    <Star score={countReviews} style={styles.score}></Star>
                </View>
            </View>
            <View style={styles.review}>
                <Text>{review}</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.smallText}>{address}</Text>
                <Text style={styles.smallText}>{date}</Text>
            </View>
        </View>
    )
}

export const Rating = ({ navigation }) => {
    const { width, height } = useWindowDimensions()
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'reviews', title: 'Отзывы' },
      { key: 'mine_reviews', title: 'Мои отзывы' },
    ]);
	const renderScene = ({ route }) => {
		switch (route.key) {
			case 'reviews':
				return <FirsRoute />;
			case 'mine_reviews':
				return <SecondRoute />;
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
                swipeEnabled={false}
				renderTabBar={props => {
					return (
                        <TabBar
                            {...props}
                            activeColor={'#fff'}
                            inactiveColor={'#C5BFBF'}
                            style={{
                                backgroundColor: 'black',
                                marginBottom: 4,
                                borderRadius: 50,
                                marginHorizontal: 22
                            }}
                            indicatorStyle={{
                                height: 0,
                            }}
                            tabStyle={{
                                margin: 'auto'
							}} />
                    )
				}}
	
			/>

		</View>


	)
};






const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: StatusBar.currentHeight,
		marginBottom: -16,
		paddingBottom: 16
    },
    elContainer: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.01,
        shadowRadius: 1.41,
        elevation: 2,
        marginVertical: 10,
        marginHorizontal: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerImageInner: {
        padding: 12,
        marginRight: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        borderRadius: 100
    },
    headerImage: {
        width: 20,
        height: 20
    },
    score: {
        height: 15,
        width: 75
    },
    smallText: {
        fontSize: 12,
        color: 'grey'
    },
    review: {
        paddingHorizontal: 12,
        marginTop: 12
    },
    footer: {
        paddingHorizontal: 12,
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    elTitle: {
        fontFamily: 'roboto-500',
        fontSize: 17
    }
})

