import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { OutlinedButton } from './ui/Buttons'
import {CategoryBuildIcon} from './images/home_icon'

const historyValues = [
    {
      id: 1,
      type: 'Hotel',
      name: 'Super Market'
    },
    {
      id: 2,
      type: 'Pharmacy',
      name: 'Eda Eczanesi'
    },
    {
      id: 3,
      type: 'School',
      name: 'Fatin Rüştü Zorlu'
    },
    {
      id: 4,
      type: 'Super Market',
      name: 'Efe Gross'
    },
    {
      id: 5,
      type: 'Super Market',
      name: 'Efe Gross'
    },
]

export const MapCategories = ({  }) => {
    return(
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.headingTitle}>Categories</Text>
                <View style={styles.fdr}>
                    <OutlinedButton text="More" />
                </View>
            </View>
            <View style={{flex: 1, paddingVertical: 24, justifyContent: 'center'}}>
                <FlatList
                    data={historyValues}
                    renderItem={({ item }) => <MapCategoriesElement data={item} />}
                    horizontal
                    keyExtractor={item => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
};
const MapCategoriesElement = ({ data }) => {
    const { name } = data
    return(
        <View style={styles.elementInner}>
            <CategoryBuildIcon size="32" color="black" />
            <Text numberOfLines={1} style={styles.elementTitle}>{name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        position: "absolute",
        bottom: 16,
        height: 150,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    heading: {
        paddingHorizontal: 16,
        marginRight: 16
    },
    headingTitle: {
        fontFamily: 'roboto-700',
        fontSize: 22
    },
    fdr: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8
    },
    elementInner: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(0,0,0,0.13)',
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: 5,
        height: 100,
        maxWidth: 110
    },
    elementTitle: {
        color: 'black',
        fontFamily: 'roboto-500'
    }
})
