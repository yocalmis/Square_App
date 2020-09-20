import React from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity, useWindowDimensions,   Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from "react-native-web-swiper";
import Book1 from "./tabs/Book1";
import Book2 from "./tabs/Book2";
import Book3 from "./tabs/Book3";
import {LoginIcon} from './images/home_icon';


const Bookmark2 = ({image, name, count}) => {
    return (
               <View style={{...styles.slideOne,marginTop:7,flex:2}}> 
                   <View style={{flex: 2,
		alignItems: 'center',
		justifyContent: 'center'}}><View style={{...styles.CircleShapeView,
		alignItems: 'center',
		justifyContent: 'center'}}><Text style={{ fontSize: 12 }}>Фото {"\n"}проф. {"\n"}арен</Text>
        </View>	   
				   </View>
                   <View style={{flex: 5}}>
				   <Text>Вас пригласили на должность”Повар”</Text>
				   <Text>Название компании</Text>
				   <Text></Text>				   
				   <Text>23.06.2020</Text>
				   </View>             
		        </View>	
    )
}




export const Bookmarks2 = ({}) => {
  return(  <ScrollView><View style={[styles.slidemain]}>  
				   
                <Bookmark2 />
					
        
                <Bookmark2 />		
				
                <Bookmark2 />		
				
                <Bookmark2 />		
				
                <Bookmark2 />			
				

                 <Bookmark2 />

			 
	  </View></ScrollView>
	 
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
