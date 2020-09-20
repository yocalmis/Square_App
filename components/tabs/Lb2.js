import React, { useEffect, useRef,Component } from 'react'
import { View, Text, StyleSheet,ScrollableTabView} from 'react-native';
import Swiper from "react-native-web-swiper";


export default class Lb2  extends Component {
  render() {
    return (
	 <View style={styles.container}>

				<View style={styles.slideOne}>
				
				<View style={styles.kutu}></View>
				<Text style={{fontSize: 23,fontWeight: "bold"}} >Hosting</Text>
				
				</View>


				<View style={styles.slideTwo}>

				<View style={styles.row}><Text style={styles.rowic}>LIST YOUR SPACE</Text></View>
				<View style={styles.row}><Text style={styles.rowic}>LEARN ABOUT HOSTING</Text></View>
				<View style={styles.row}><Text style={styles.rowic}>HOST AN EXPERIENCE</Text></View>

				</View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	slideOne: {
		backgroundColor: '#FFFFFF',
		flex: 4, // 3:6
		  alignItems: 'center',
		      justifyContent: 'center'

	},
	slideTwo: {
		backgroundColor: '#FFFFFF',
		flex: 4, 
		  alignItems: 'center',	
	},

		kutu: {
	width: 60,
	height: 60,
	backgroundColor: '#FFFFFF',
	marginTop:40,
	marginBottom:40,
	borderWidth: 4,
	},
	  row: {
	height: 30,
    paddingTop: 9,
	borderTopColor: "black",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,

  },

  	  rowic: {
	textAlign: 'justify',
	fontSize: 13
  }


})











