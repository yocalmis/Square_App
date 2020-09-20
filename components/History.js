import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Star from 'react-native-star-view';



const _history = [
    {
        id: 1,
        title: 'Хостел “Дежавю”',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'Hotel',
        review: 3.5,
        date: ['01.07.2020', '05.07.2020'],
        price: 120,
        priceCurrency: '$'
    },
    {
        id: 2,
        title: 'Хостел “Дежавю”',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'Hotel',
        review: 3.5,
        date: ['01.07.2020', '05.07.2020'],
        price: 120,
        priceCurrency: '$'
    },
    {
        id: 3,
        title: 'Хостел “Дежавю”',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'Hotel',
        review: 3.5,
        date: ['01.07.2020', '05.07.2020'],
        price: 120,
        priceCurrency: '$'
    },
]


export const History = ({ navigation }) => {

    return (
        <ScrollView style={styles.container}>
            {_history.map(history => {
                const { title, description, type, review, date, id, price, priceCurrency } = history
                return (
                    <HistoryElement 
                        key={id}
                        title={title}
                        description={description}
                        type={type}
                        review={review}
                        date={date}
                        price={price}
                        priceCurrency={priceCurrency}
                    />
                )
            })}
        </ScrollView>
    )
    
};

const HistoryElement = ({ title, description, type, review, date, price, priceCurrency }) => {
    return (
        <TouchableOpacity>
            <View style={styles.elContainer}>
                <Text style={styles.elTitle}>{title}</Text>
                <View style={styles.scoreInner}>
                    <Star score={review} style={styles.score}></Star>
                </View>
                <Text style={styles.elDescription}>{description}</Text>
                <View style={styles.tableInner}>
                    <Text style={styles.tableTitle}>Type: </Text>
                    <Text style={styles.tableDesc}>{type}</Text>
                </View>
                <View style={styles.tableInner}>
                    <Text style={styles.tableTitle}>Date: </Text>
                    <Text style={styles.tableDesc}>{date.join(' - ')}</Text>
                </View>
                <View style={styles.priceInner}>
                    <Text style={styles.price}>{price} {priceCurrency}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    elTitle: {
        fontFamily: 'roboto-500',
        fontSize: 18
    },
    elDescription: {
        color: 'grey',
        marginBottom: 12,
        fontFamily: 'roboto-400'
    },
    score: {
        height: 15,
        width: 75,
        
    },
    tableInner: {
        flexDirection: 'row',
    },
    priceInner: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    price: {
        fontSize: 22,
        fontFamily: 'roboto-500'
    },
    tableTitle: {
        color: 'grey'
    },
    tableDesc: {
        fontFamily: 'roboto-400'
    }
})