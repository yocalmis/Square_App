import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import store from '../../store/store'
import operations from '../../store/fetch'
import { observer } from 'mobx-react';
import { ProductInfoElement } from './ProductInfoElement'
import { ProductInfoChips } from './ProductInfoChips'



export const ProductInfo = observer(({ currentItem, currentPosition }) => {

    const { options_list, description, type_title } = currentItem
    const _onPress = () => console.log('AAAAA')
    useEffect(() => {
        console.log(currentItem)
    }, [])

    return (
        <>
        <View style={styles.container}>
            {description && <ProductInfoElement iconName="description" text={description} onPress={_onPress} />}
            <ProductInfoElement iconName="subject" text={type_title} onPress={_onPress} />
            <ProductInfoElement iconName="location-on" text={currentPosition} onPress={_onPress} />
            {options_list && <ProductInfoChips chipsArr={options_list.map(option => option.title)} />}
        </View>
        </>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 52
    }
})
