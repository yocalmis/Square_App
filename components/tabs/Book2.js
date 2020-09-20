import React, { Component } from 'react'
import { View, Text, StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Book2  extends Component {
  render() {
    return (
    <View style={styles.container}>
  
				<View style={styles.slideOne}>
				<View style={styles.kutu}></View>					
				<Text style={{fontSize: 23,fontWeight: "bold"}} >Bookmarks</Text>										
				</View>
					
					
				<View style={styles.slideTwo}>
				
				<View style={styles.row3}>
				
				<View style={styles.row4}>
				<Image style={{ width: '100%', height: '100%' }} source={require("../images/indir.jpg")}/></View>
				<View style={styles.row5}><Image style={{ width: '100%', height: '100%' }} source={require("../images/indir.jpg")}/></View> 				
				</View> 		


				<View style={styles.row3}>
				<View style={styles.row4}><Image style={{ width: '100%', height: '100%' }} source={require("../images/indir.jpg")}/></View> 
				<View style={styles.row5}><Image style={{ width: '100%', height: '100%' }} source={require("../images/indir.jpg")}/></View> 				
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
  
  	row3: {
	height: 100,
	borderTopColor: "black",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
	flexDirection:"row" 	
	}, 
    row4: {
	flexDirection:"row" ,
	backgroundColor: '#dddddd',
	flex: 2,		borderTopWidth:1, alignItems: 'center',justifyContent: 'center'
	},
    row5: {
	flexDirection:"row" ,
	backgroundColor: '#bebebe',
	flex: 2,		borderTopWidth:1, alignItems: 'center',justifyContent: 'center',   
	borderTopWidth:1, 
  }
  
})











