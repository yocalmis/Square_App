import React, { useRef } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import store from '../store/store'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import {SearchBar} from './SearchBar'
import {Badge} from './ui/badge'
import {PopularElement} from './PopularElement'
import {HistoryElement} from './historyElement'


const someValues = [
    {
        type: 'Mall',
        place: 'Kayseri Forum',
        image: 'https://lh5.googleusercontent.com/p/AF1QipN-9IPm1EDUcMUMGKUOQnL3T0cbzoGt5PsrLV8F=w408-h244-k-no',
        feedBack: {
            stars: 5,
            peopleCount: 160
        },
    },
    {
        type: 'Cinema',
        place: 'Ipeksaray Cinelux',
        image: 'https://lh5.googleusercontent.com/p/AF1QipMc5YqOaGK_sQFXE_98y2hv2K0UUDzfHuZRwlu3=w547-h240-k-no',
        feedBack: {
            stars: 4.1,
            peopleCount: 83
        },
    },
    {
        type: 'Cafe',
        place: 'Turuncu Kafe',
        image: 'https://lh5.googleusercontent.com/p/AF1QipPQWh32Se8Nw8WdxMpid-3oKGdDvlnwCm0RxVjP=w408-h306-k-no',
        feedBack: {
            stars: 4.2,
            peopleCount: 650
        },
    },
    {
        type: 'E-Spor Place',
        place: 'Enderun Internet Cafe',
        image: 'https://lh5.googleusercontent.com/p/AF1QipN-Bqe9cQB2XNcWTT9avlfukBEu1fhXvDN9J05M=w408-h306-k-no',
        feedBack: {
            stars: 5,
            peopleCount: 999
        },
    },
    {
        type: 'Hotel',
        place: 'Radisson Blue Hotel',
        image: 'https://lh5.googleusercontent.com/p/AF1QipPPUx-gYehkTrT5KpWfrw7Ikf4TpUUMVZSDpchL=w426-h240-k-no',
        feedBack: {
            stars: 3,
            peopleCount: 150
        },
    },
    {
        type: 'Historical Place',
        place: 'Ordu Evi',
        image: 'https://lh5.googleusercontent.com/p/AF1QipOmkKgQRkfbAXlh7pSQKR92wxvvxlVfPx3xKimN=w408-h306-k-no',
        feedBack: {
            stars: 3,
            peopleCount: 150
        },
    },
]

const historyValues = [
    {
      id: 1,
      name: 'Mehmet Şimşek',
      type: 'Super Market',
      latitude: 38.764888,
      longitude: 35.605685
    },
    {
      id: 2,
      type: 'Pharmacy',
      name: 'Eda Eczanesi',
      latitude: 38.766176,
      longitude: 35.604161,
    },
    {
      id: 3,
      type: 'School',
      name: 'Fatin Rüştü Zorlu',
      latitude: 38.760102,
      longitude: 35.601372,
    },
    {
      id: 4,
      type: 'Super Market',
      name: 'Efe Gross',
      latitude: 38.763039,
      longitude: 35.599827,
    },
]

export const SearchPage = observer(({ navigation }) => {
    const swiperRef = useRef(null)
    const { screenWidth, screenHeight } = store 
    const clearHistory = () => {
        console.log('You cleared history')
    }
    return (
        <>
            <SearchBar />
            <View style={styles.container}>
                <Badge text="Popular" />
                <View style={{height: 180, paddingTop: 10, paddingLeft: 12}}>
                    <FlatList
                        data={someValues}
                        renderItem={({ item }) => <PopularElement mapEl={item} />}
                        horizontal
                        keyExtractor={item => item.image}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <Badge text="History" hasButton="true" buttonTitle="Clear" buttonFunc={clearHistory} />
                <FlatList
                    data={historyValues}
                    renderItem={({ item }) => <HistoryElement data={item} />}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </>
    )
});


const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        backgroundColor: 'white',
        flex: 1
    }
})