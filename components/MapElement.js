import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import store from '../store/store'
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import { TextButton, FloatButton, ContainedButton } from './ui/Buttons';
import Star from 'react-native-star-view';
import { getDistance } from 'geolib';
import Ionicons from 'react-native-vector-icons/Ionicons';


export const MapElement = observer(({ mapEl, navigation }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { uuid, title, image, rating, lat, lng, type_title, sale } = mapEl.item
  const { location } = store
  

  let latencyBetweenDistances = location ? getDistance(
    { latitude: location.latitude, longitude: location.longitude},
    { latitude: lat, longitude: lng },
  ) : null;

  useEffect(() => {
    //console.log('Map Element : image : ', image)
  }, [])
  
  

  return(
    <View style={styles.container}>
        <View style={styles.imageContent}>
          <TouchableOpacity onPress={() => navigation.navigate('Product', {uuid, openImage: true})}>
            <Image style={styles.image} source={{
              uri: image ? image.original : 'https://cdn.shopify.com/s/files/1/2009/8293/products/N1000.jpg?v=1575932439'
            }}
            resizeMode={image ? 'cover' : 'contain'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Product', {uuid})}>
        <View style={styles.innerContent}>
          <View style={styles.main}>
            <Text style={styles.heading} numberOfLines={1}>{title}</Text>
            <View style={styles.rating}>
              <Text style={styles.secondaryText}>{rating.stars}</Text>
              <Star score={rating.stars} style={styles.starStyle} />
              <Text style={styles.secondaryText}>({rating.count})</Text>
            </View>
            
          </View>
          {sale && (
            <View style={styles.price}>
              <Text style={styles.priceText}>от {sale.tariff} тг</Text>
            </View>
          )}
          
        </View>
        <View style={styles.descContent}>
          <View style={styles.typeOf}>
            <Text style={styles.secondaryText}>{type_title}</Text>
            <Text style={{...styles.secondaryText, marginHorizontal: 4}}>•</Text>
            <Text style={styles.secondaryText}>{latencyBetweenDistances}m</Text>
          </View>
        </View>

      </TouchableOpacity>
      <View style={styles.btnInner}>
        <View style={styles.btnInnerActions}>
          <ContainedButton text="Reserve" onPress={() => navigation.navigate('Product', {uuid})}/>
          <TextButton text="More" onPress={() => navigation.navigate('Product', {uuid})}/>
        </View>
        <View style={styles.btnInnerActions}>
          <FloatButton>
            <Ionicons name="ios-heart" size={24} color="#757575" />
          </FloatButton>
          {/* <FloatButton>
            <Ionicons name="md-share" size={24} color="#757575" />
          </FloatButton> */}
        </View>
        
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isOpen}
        >
          <View style={{flex: 1}}></View>
      </Modal>
    </View>
  )
})

const styles = StyleSheet.create(toJS({
  container: {
    borderRadius: 8,
    flex: 2,
    minHeight: 290,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginHorizontal: 15,
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'roboto-500',
    color: '#212324'
  },
  desc: {
    color: 'grey'
  },
  innerContent: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 290 - ( 290 * 55 / 100 ),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  reserveBtn: {
    marginTop: 'auto',
    backgroundColor: '#1A73E8'
  },
  reserveBtnTxt: {
    color: 'white'
  },
  main: {
    paddingRight: 16
  },
  starStyle: {
    width: 70,
    height: 15,
    marginHorizontal: 4
  },
  feedBack: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  secondaryText: {
    color: 'grey'
  },
  typeOf: {
    flexDirection: 'row',
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12
  },
  btnInnerActions: {
    flexDirection: 'row'
  },
  descContent: {
    paddingHorizontal: 12
  },
  price: {
    flexDirection: 'row'
  },
  priceText: {
    fontSize: 22,
    fontFamily: 'roboto-700',
    color: '#212324'
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center'
  }
}))
