import React, { Component } from 'react'
import { View, Text, StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Book3  extends Component {
  render() {
    return (
	<View style={styles.container}>
  
				<View style={styles.slideOne}>
				<View style={styles.kutu}></View>					
				<Text style={{fontSize: 23,fontWeight: "bold"}} >History</Text>										
				</View>
					
					
				<View style={styles.slideTwo}>
				
				<View style={styles.row}>
				<View style={styles.row1}><Image
  style={{ width: '100%', height: '100%' }} source={require("../images/indir.jpg")}/></View>
				<View style={styles.row2}>
				<Text style={styles.rowic}>{"April 19 at 13:40\n World blvd.\n Total $1500"}</Text>				
				</View> 				
				</View> 		


				<View style={styles.row}>
				<View style={styles.row1}><Image
  style={{ width: '100%', height: '100%' }} source={require("../images/indir.jpg")}/></View> 
				<View style={styles.row2}><Text style={styles.rowic}>{"April 19 at 13:40\n World blvd.\n Total $1500"}</Text></View> 				
				</View>



				<View style={styles.row}>
				<View style={styles.row1}><Image
  style={{ width: '100%', height: '100%' }} source={require("../images/indir.jpg")}/></View> 
				<View style={styles.row2}><Text style={styles.rowic}>{"April 19 at 13:40\n World blvd.\n Total $1500"}</Text></View> 				
				</View>


				<View style={styles.row}>
				<View style={{...styles.row1,borderBottomWidth:1}}><Image
  style={{ width: '100%', height: '100%' }} source={require("../images/indir.jpg")}/></View> 
				<View style={{...styles.row2,borderBottomWidth:1}}><Text style={styles.rowic}>{"April 19 at 13:40\n World blvd.\n Total $1500"}</Text></View> 				
				</View>

				
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
	height: 50,
	borderTopColor: "black",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection:"row" 	
  },
  
    row1: {
    flexDirection:"row" ,
	backgroundColor: '#ffffff',
	flex: 1,		borderTopWidth:1, alignItems: 'center',justifyContent: 'center'
  },
    row2: {
    flexDirection:"row" ,
    flex: 3,
	backgroundColor: '#ffffff',			  
	alignItems: 'center',
	paddingLeft:15,
	borderTopWidth:1, 
  },
  
  	rowic: {
	textAlign: 'justify',	
	fontSize: 13,	  
  }
  
 
})











