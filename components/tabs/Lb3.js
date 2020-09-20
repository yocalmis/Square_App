import React, { useEffect, useRef,Component } from 'react'
import { View, Text, StyleSheet,ScrollableTabView} from 'react-native';
import Star from 'react-native-star-view';
import Swiper from "react-native-web-swiper";


export default class Lb3  extends Component {
  render() {
    return (
	  <View style={styles.container}>

				<View style={styles.slideOne}>
				<View style={styles.kutu}></View>
				<Text style={{fontSize: 23,fontWeight: "bold"}} >Ratings</Text>
              	</View>

				<View style={styles.slideTwo}>
			    <View >
                <Star score={4.2} style={styles.st} />
                </View>
				<View style={styles.row}><Text style={styles.rowic}>Total Ratings: 26</Text></View>
				<View style={styles.row}><Text style={styles.rowic}>Positive Ratings: 22</Text></View>
				<View style={styles.row}><Text style={styles.rowic}>Negative Ratings: 4</Text></View>

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











