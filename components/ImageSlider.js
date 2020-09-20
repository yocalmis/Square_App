import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Image } from 'react-native';
import ImageView from "react-native-image-viewing";

export const ImageSlider = ({ images, sliderHeight }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const showModal = image => {
        const currentImage = images.indexOf(image)
        setModalVisible(true)
        setActiveImage(currentImage)
    }
    return (
        <>
        <View style={{...styles.container, height: sliderHeight}}>
            <FlatList
                data={images}
                renderItem={({item}) => <ImageSliderElement image={item} showModal={showModal} />}
                horizontal
                keyExtractor={((item, index) => index.toString())}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft: 16}}
                removeClippedSubviews={false}
            />
            
        </View>
        <ImageView
            images={images}
            imageIndex={activeImage}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            presentationStyle={"overFullScreen"}
        />
        </>
    )
};

export const ImageSliderElement = ({ image, showModal }) => {
    return (
        <TouchableOpacity onPress={() => showModal(image)}>
            <Image source={image} style={styles.image} />
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    image: {
        width: 250,
        marginRight: 8,
        height: 150,
        borderRadius: 6,
        height: 150
    }
})