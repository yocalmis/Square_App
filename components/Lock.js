import React from 'react'
import { View, Text, StyleSheet,TouchableHighlight,TouchableOpacity} from 'react-native';

export const Lock = ({/* All props here */}) => {
  return(
				<View style={styles.container}>
  
					<View style={styles.slideOne}>
				<View style={styles.kutu}></View>					
				<Text style={{fontSize: 23,fontWeight: "bold"}} >Unlock Button</Text>										
					</View>		


					
				<View style={styles.slideTwo}>
				
<View style={[{width:"90%",    paddingTop: 22,}]}>
        <TouchableHighlight style={styles.btns}>
          <Text >Front Doors</Text>
        </TouchableHighlight>

</View> 		
<View style={[{width:"90%",    paddingTop: 22,}]}>
        <TouchableHighlight style={styles.btns}>
          <Text >Apartment</Text>
        </TouchableHighlight>

</View> 

<View style={styles.footer1} >
</View> 

<View style={styles.footer2} >
              <TouchableOpacity >
                <Text >How to use? See instruction</Text>
              </TouchableOpacity>  

</View> 
		
				</View>  
	  
    </View>
  )
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
  },
  
  	  btns: {
borderRadius:7,
borderWidth: 1,  
alignItems: 'center',	      
justifyContent: 'center',
backgroundColor: '#ffffff',	
	height: 40, 		  
			
  } ,
   footer1: {    flex: 4  }, 
  footer2: {    flex: 1,
width:"90%",    
paddingBottom:20 ,
alignItems: 'center',
justifyContent: 'center',  }

})
