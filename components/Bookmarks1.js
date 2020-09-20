import React from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity, useWindowDimensions,   Dimensions, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import Swiper from "react-native-web-swiper";
import Book1 from "./tabs/Book1";
import Book2 from "./tabs/Book2";
import Book3 from "./tabs/Book3";
import {LoginIcon} from './images/home_icon';




const Bookmark1 = ({image, name, count}) => {
    return (
                   <View style={[styles.slideTwo]}>
					
				<View style={{flex: 5,backgroundColor:"#000000",width:"95%",justifyContent: 'center',alignItems: 'center'}}><Text style={{color:"#FFFFFF",fontSize:28}}>ФОТО</Text></View>		
            	<View style={{flex: 3,backgroundColor:"#ffffff",width:"90%"}}>
				<View><Text style={{fontSize:10}}>Аренда квартиры 1комната</Text></View>
				<View style={{flexDirection: "row"}}>
				<View style={{flex: 9}}><Text style={{fontSize:10}}>6000 тенге</Text></View>
				<View style={{flex: 2,flexDirection: "row"}}>
					<FontAwesome name="heart" size={13} color="black" /><Entypo name="share" size={13} color="black" />
				</View>
				</View>
				<View><Text style={{fontSize:10}}>Алматы</Text></View>
				</View>					
					
					</View>
    )
}






export const Bookmarks1 = ({}) => {
  return(
	 
	 
	 /*Tab 1*/
	 	                    <View style={[styles.slidemain]}>  
                 <View style={[styles.slideOne]}> 
                    <Bookmark1 />
                    <Bookmark1 />							
			        </View>
					
                 <View style={[styles.slideOne]}> 
                    <Bookmark1 />
                    <Bookmark1 />							
			        </View>
                 <View style={[styles.slideOne]}> 
                    <Bookmark1 />
                    <Bookmark1 />							
			        </View>

                 <View style={[styles.slideOne]}> 
                    <Bookmark1 />
                    <Bookmark1 />							
			        </View>					
	  </View>	
	  
	  
	  
	 
	 
  )
}

const styles = StyleSheet.create({


    slidemain: {
        flex: 1,marginTop:30,backgroundColor:"#DDDDDD"
    },
    slideContainer: {
        flex: 1,

    },
    slide1: {
        backgroundColor: "#FFFFFF"
    },
    slide2: {
        backgroundColor: "#FFFFFF"
    },
    slide3: {
        backgroundColor: "#FFFFFF"
    }
   
   ,
   	slideOne: {
		flex: 3, // 3:6
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: "row",
		backgroundColor:"#FFFFFF",

	},
	slideTwo: {
		backgroundColor: '#FFFFFF',
		flex: 3,
		alignItems: 'center'


	},
   
   
   	slidethree: {
		backgroundColor: '#FFFFFF',
		flex: 3,
		alignItems: 'center'


	},
   imageShadow: {
		shadowColor: "#DDDDDD",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.40,
		shadowRadius: 1.41,
		elevation: 2,
		borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
		overflow: 'visible',

	},
	headerImage: {
		width: 70,
		height: 70,
		borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
	},
   
     CircleShapeView: {
    width: 75,
    height: 75,
    borderRadius: 150/2,
    backgroundColor: '#DDDDDD'
},
   
})
