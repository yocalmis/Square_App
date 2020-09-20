import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import Swiper from "react-native-web-swiper";
import { Button } from '../ui/Buttons'
import operations from '../../store/fetch'
import {observer} from 'mobx-react'



export default class User1  extends Component {
  render() {
	    const logout = () => operations.removeTokenFromStorage()
    return (

<View style={styles.container}>

				<View style={styles.slideOne}>
				<Text style={{fontSize: 23,fontWeight: "bold",marginTop:30}} >Edit Personel Info</Text>
				</View>


				<View style={styles.slideTwo}>

				<View style={styles.row}>
				<View style={styles.row2}><Text style={styles.rowic1}>First Name</Text></View>
				<View style={styles.row2}><Text style={styles.rowic}>Amir</Text>
				</View>
				</View>


				<View style={styles.row}>
				<View style={styles.row2}><Text style={styles.rowic1}>Last Name</Text></View>
				<View style={styles.row2}><Text style={styles.rowic}>Abenow</Text>
				</View>
				</View>


				<View style={styles.row}>
				<View style={styles.row2}><Text style={styles.rowic1}>Gender</Text></View>
				<View style={styles.row2}><Text style={styles.rowic}>Male</Text>
				</View>
				</View>


				<View style={styles.row}>
				<View style={styles.row2}><Text style={styles.rowic1}>E-Mail</Text></View>
				<View style={styles.row2}><Text style={styles.rowic}>Satzewoo@gmail.com</Text>
				</View>
				</View>



				<View style={styles.row}>
				<View style={styles.row2}>
				<View style={styles.sol}><Text style={styles.rowic1}>Phone Number</Text></View>
				<View style={styles.sag}><Text style={styles.rowicsag}>Edit</Text></View>				
				</View>
				<View style={styles.row2}><Text style={styles.rowic}>+7 755 90-03309</Text>
				</View>
				</View>


				<View style={styles.row}>
				<View style={styles.row2}>
				<View style={styles.sol}><Text style={styles.rowic1}>Government Id</Text></View>
				<View style={styles.sag}><Text style={styles.rowicsag}>Add</Text></View>
				</View>
				<View style={styles.row2}><Text style={styles.rowic}>1234568864433</Text>
				</View>
				</View>

				
				
				<View style={styles.row}>
				<View style={styles.row2}>
				<View style={styles.sol}><Text style={styles.rowic1}>Emergency Contact</Text></View>
				<View style={styles.sag}><Text style={styles.rowicsag}>Add</Text></View>
				</View>
				<View style={styles.row2}><Text style={styles.rowic}>+7 755 90-03309</Text>
				</View>
				</View>


				<View style={styles.btnrw}>
				<View style={[{width:"90%"}]}>
				<TouchableHighlight style={styles.btns}>
				<Text style={{color:"#ffffff"}}>Add Credit Card</Text>
				</TouchableHighlight>
				</View>
				</View>
				


				<View style={styles.btnrw}>
				<View style={[{width:"90%",marginTop:20}]}>
				<TouchableHighlight style={styles.btns2}>
				<Text style={{color:"#000000"}}>Save</Text>
				</TouchableHighlight>
				</View>
				</View>

				<Button text="Logout" onPress={logout} style={{alignSelf: 'center'}}/>




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
		flex: 1, // 3:6
		  alignItems: 'center',
		      justifyContent: 'center'

	},
	slideTwo: {
		backgroundColor: '#FFFFFF',
		flex: 4,marginTop:30,
		  alignItems: 'center',
	},
	  row: {
	height: 40,
	borderTopColor: "black",
    borderBottomColor: "black",
	borderBottomWidth:1,
	width:"100%"
	},
	sol: {
    flex: 5,
	},
	sag: {
    flex: 1,
	},
    row2: {

    flex: 3,
	backgroundColor: '#ffffff',
		      paddingLeft:15,
	flexDirection:"row"
	},
  	rowic: {
	textAlign: 'justify',
	fontSize: 13,
	},
  	 rowic1: {
	textAlign: 'justify',
	fontSize: 15,
	fontWeight: "bold"
	},
    rowicsag: {
	textAlign: 'right',
	paddingRight:10,
	fontSize: 14
	},
  	 btns2: {
	borderRadius:3,
	borderWidth: 1,
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#FFFFFF',
	height: 40,
  } ,
  	 btns: {
	borderRadius:3,
	borderWidth: 1,
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#000000',
	height: 40
  },

	btnrw: {
	backgroundColor: '#FFFFFF',
    alignItems: 'center',
	width:"100%"
	}

})












