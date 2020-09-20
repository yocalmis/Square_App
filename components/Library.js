import React from 'react'
import { View, Text, StyleSheet, ScrollableTabView, Image, ScrollView, StatusBar} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const categories = [
    {
        id: 'rest_zones',
        name: 'Зоны отдыха',
        count: 100,
        image: require('../assets/images/category_images/1.png')
    },
    {
        id: 'hotels',
        name: 'Гостиницы',
        count: 100,
        image: require('../assets/images/category_images/2.png')
    },
    {
        id: 'game_zones',
        name: 'Игротеки',
        count: 100,
        image: require('../assets/images/category_images/3.png')
    },
    {
        id: 'others',
        name: 'Разное',
        count: 100,
        image: require('../assets/images/category_images/4.png')
    },
    {
        id: 'car_sharing',
        name: 'Каршеринг',
        count: 100,
        image: require('../assets/images/category_images/5.png')
    },
    {
        id: 'sport_places',
        name: 'Спортивные объекты',
        count: 100,
        image: require('../assets/images/category_images/6.png')
    },
    {
        id: 'photo_studio',
        name: 'Фотостудии',
        count: 100,
        image: require('../assets/images/category_images/7.png')
    },
    {
        id: 'cafe_queue',
        name: 'Кафе очередь',
        count: 100,
        image: require('../assets/images/category_images/8.png')
    },
    {
        id: 'car_dealerships',
        name: 'Автосалоны',
        count: 100,
        image: require('../assets/images/category_images/9.png')
    },
    {
        id: 'massage_center',
        name: 'Массажные центра',
        count: 100,
        image: require('../assets/images/category_images/10.png')
    },
    {
        id: 'tire_service',
        name: 'Шиномонтаж',
        count: 100,
        image: require('../assets/images/category_images/11.png')
    },
    {
        id: 'car_service',
        name: 'Автосервис',
        count: 100,
        image: require('../assets/images/category_images/12.png')
    },
    {
        id: 'apartments_and_houses',
        name: 'Квартиры Дома',
        count: 100,
        image: require('../assets/images/category_images/13.png')
    },
    {
        id: 'baths_and_saunas',
        name: 'Бани / сауны',
        count: 100,
        image: require('../assets/images/category_images/14.png')
    },
    {
        id: 'car_wash',
        name: 'Автомойки',
        count: 100,
        image: require('../assets/images/category_images/15.png')
    },
    {
        id: 'parking',
        name: 'Стоянки',
        count: 100,
        image: require('../assets/images/category_images/16.png')
    },
    {
        id: 'hostels',
        name: 'Хостелы',
        count: 100,
        image: require('../assets/images/category_images/17.png')
    },
    {
        id: 'beauty_salons',
        name: 'Салоны красоты',
        count: 100,
        image: require('../assets/images/category_images/18.png')
    },
    {
        id: 'coworking',
        name: 'Коворкинг',
        count: 100,
        image: require('../assets/images/category_images/19.png')
    },
    {
        id: 'clock_office',
        name: 'Офис по часовой',
        count: 100,
        image: require('../assets/images/category_images/20.png')
    },

]

const LibraryElement = ({image, name, count}) => {
    return (
        <TouchableOpacity>
            <View style={styles.lElementContainer}>
                <View style={styles.lElementImageInner}>
                    <Image source={image} style={styles.lElementImage}/>
                </View>
                <View style={styles.lElementTextInner}>
                    <Text style={styles.lElementTitle}>{name}</Text>
                    <Text style={styles.lElementDesc}>{count} объявлений</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export const Library = ({/* All props here */}) => {

  return(
      <View style={styles.main}>
          <View style={styles.heading}>
              <Text style={styles.headingTitle}>Категории</Text>
            </View>
          <ScrollView>
          {categories.map(category => {
              const {id, name, count, image} = category
              return <LibraryElement key={id} name={name} count={count} image={image} />
          })}
          </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: StatusBar.currentHeight
    },
    heading: {
        paddingHorizontal: 16,
        paddingVertical: 22
    },
    headingTitle: {
        fontSize: 22,
        fontFamily: 'roboto-700',
    },
    lElementContainer: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.13)'
    },
    lElementImageInner: {
        marginRight: 20
    },
    lElementImage: {
        width: 40,
        height: 40
    },
    lElementTitle: {
        fontFamily: 'roboto-500',
        fontSize: 16
    },
    lElementDesc: {
        fontFamily: 'roboto-400',
        color: '#999999',
        fontSize: 13
    }
})
