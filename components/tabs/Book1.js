import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Book1  extends Component {
  render() {
    return (
 <View style={styles.container}>
  
					<View style={styles.slideOne}>
				<View style={styles.kutu}></View>					
				<Text style={{fontSize: 23,fontWeight: "bold"}} >Inbox</Text>										
					</View>
					
					
				<View style={styles.slideTwo}>
				
				<View style={styles.row}>
				<View style={styles.row1}><Icon name="comment" size={40} color="#ddd" /></View>
				<View style={styles.row2}><Text style={styles.rowic}>Comments will appear here</Text></View> 				
				</View> 		


				<View style={styles.row}>
				<View style={styles.row1}><Icon name="volume-up" size={40} color="#ddd" /></View> 
				<View style={styles.row2}><Text style={styles.rowic}>Notifications will appear here</Text></View> 				
				</View>



				<View style={styles.row}>
				<View style={styles.row1}><Icon name="file" size={40} color="#ddd" /></View> 
				<View style={styles.row2}><Text style={styles.rowic}>News will appear here</Text></View> 				
				</View>


				<View style={styles.row}>
				<View style={{...styles.row1,borderBottomWidth:1}}><Icon name="adjust" size={40} color="#ddd" /></View> 
				<View style={{...styles.row2,borderBottomWidth:1}}><Text style={styles.rowic}>Special Offers will appear here</Text></View> 				
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
	flex: 4, 
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
	backgroundColor: '#ffffff',			  alignItems: 'center',
		      paddingLeft:15,
			  		borderTopWidth:1, 
    },
  	rowic: {
	textAlign: 'justify',	
	fontSize: 13,	  
    }
   
})











