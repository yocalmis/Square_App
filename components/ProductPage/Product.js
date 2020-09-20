import React, { useEffect, Component, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, useWindowDimensions  } from 'react-native';
import store from '../../store/store'
import operations from '../../store/fetch'
import {observer} from 'mobx-react';
import {ImageSlider} from '../ImageSlider'
import Star from 'react-native-star-view';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { ProductInfo } from './ProductInfo'
import Toast, {DURATION} from 'react-native-easy-toast'
import { ProductInfoReserveButton } from './ProductInfoReserveButton'



const SecondRoute = () => <View style={{flex: 1}}></View>


const ProductPage = observer(({ navigation, updateTitle }) => {
    const toast = useRef(null)

    const id = navigation.getParam('uuid', 0)
    const isFromBusinnes = navigation.getParam('fromBusinnes', false)
    const openImage = navigation.getParam('openImage', false)
    const {places} = operations
    const currentItem = isFromBusinnes ? operations.getBusinnesPlaces(id) : operations.getPlacesById(id)
    const { sale, title, images, rating, lat, lng, image } = currentItem || {}
    const { width, height } = useWindowDimensions()
    const [index, setIndex] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(`${lat}, ${lng}`)
    const [routes] = useState([
      { key: 'info', title: 'Overview'.toUpperCase() },
      { key: 'reviews', title: 'Reviews'.toUpperCase() },
    ]);
    
    const changeAddres = address => setCurrentPosition(address)
    const errFunction = err => toast.current.show(err, 1000)

    useEffect(() => {
        if (openImage) {
            // Open Image Slider
        }
    }, [openImage])

    useEffect(() => {
        updateTitle(title)
        operations.getAddresByCoors({
            coors: {lat, lng},
            succsessCallback: changeAddres,
            erroCallback: errFunction
        })
        operations.getPlaceInfo(id)
    }, [])

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'info':
                return <ProductInfo currentItem={currentItem} currentPosition={currentPosition} />;
            case 'reviews':
                return <SecondRoute />;
            default:
                return null;
        }
    };

    const RenderImageSlider = () => {
        if (images) {
            return (
                <ImageSlider sliderHeight={150} images={images.map(image => {
                    return {uri: image.original}
                })} />
            )
        }
        else if (!images && image) {
            return <ImageSlider sliderHeight={150} images={[{uri: image.original}]} />
        }
        else {
            return <></>
        }
    }

    return (
        <>
        <ScrollView style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.container}>
            <View style={styles.sliderInner}>
                <RenderImageSlider />
                
            </View>
            <View style={styles.header}>
                <View styles={styles.titleInner}>
                    <Text style={styles.title}>{title}</Text> 
                    {rating && (
                        <View style={styles.feedBack}>
                            <Text style={styles.secondaryText}>{rating.stars}</Text>
                            <Star score={rating.stars} style={styles.starStyle}></Star>
                            <Text style={styles.secondaryText}>({rating.count})</Text>
                        </View>
                    )}
                    
                </View>
                {sale && (
                <View styles={styles.priceInner}>
                    <Text style={styles.price}>от {sale.tariff} тг</Text>
                </View>
                )}
                
            </View>
            <View style={{flex: 1}}>
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
                            labelStyle={{paddingHorizontal: 4}}
                            style={{backgroundColor: 'white', marginBottom: 4}}
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
        </View>
        <Toast ref={toast} style={{backgroundColor:'red'}}/>
        </ScrollView>
        {index === 0 && <ProductInfoReserveButton  />}
        </>
        
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
        backgroundColor: 'white'
    },
    sliderInner: {
        flexDirection: 'row',
        marginBottom: 12
    },
    feedBack: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    starStyle: {
        width: 70,
        height: 15,
        marginHorizontal: 4
    },
    secondaryText: {
        color: 'grey'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.13)'
    },
    title: {
        fontSize: 20,
        fontFamily: 'roboto-700',
        color: 'black'
    },
    priceInner: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    price: {
        fontSize: 22,
        fontFamily: 'roboto-700'
    }
})

export class Product extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Product'),
        };
    };
  
    render() {
        const updateTitle = title => this.props.navigation.setParams({ title })

        return <ProductPage {...this.props} updateTitle={updateTitle} />
    };

};


