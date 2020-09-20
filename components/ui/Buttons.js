import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export const Button = ({ text, onPress, btnStyles, txtStyles }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...styles.button, ...btnStyles}}>
        <Text style={{...styles.buttonText, ...txtStyles}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export const ContainedButton = ({ text, onPress, color, bgColor, btnStyles, txtStyles, disabled }) => {

  const innerObj = {
    ...styles.containedButton, 
    ...btnStyles,
    ...(bgColor && {backgroundColor: bgColor}),
    ...(disabled && {
      backgroundColor: 'rgb(204, 204, 204)',
      shadowColor: 'transparent',
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    })
  };
  const textObj = {
    ...styles.containedButtonText,
    ...txtStyles, 
    ...(color && {color}),
    ...(disabled && {color: 'rgb(137,137,137)'})
  };


  return (
    <TouchableOpacity onPress={onPress} style={innerObj}>
        <Text style={textObj}>{text}</Text>
    </TouchableOpacity>
  );
}
export const OutlinedButton = ({ text, onPress, color, bgColor }) => {

  const innerObj = {...styles.outlinedButton, ...(bgColor && {backgroundColor: bgColor})};
  const textObj = {...styles.outlinedButtonText, ...(color && {color})};

  return (
    <TouchableOpacity onPress={onPress} style={innerObj}>
        <Text style={textObj}>{text}</Text>
    </TouchableOpacity>
  );
}

export const ActionButton = ({ text, navigation, navigate, icon, btnStyles, txtStyles }) => {
  console.log(navigation)
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigate)}>
      <View style={{...styles.actionButton, ...btnStyles}}>
        <View style={styles.iconInner}>{icon}</View>
        <Text style={{...styles.actionButtonText, ...txtStyles}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export const ModalButton = ({ text, onPress, btnStyles, txtStyles }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...styles.modalBtnInner, ...btnStyles}}>
        <Text style={{...styles.modalBtnText, ...txtStyles}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
export const FloatButton = ({ children, onPress, btnStyles }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.floatBtnInner, ...btnStyles}}>
      {children}
    </TouchableOpacity>
  );
}
export const TextButton = ({ text, onPress, btnStyles, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
      ...styles.textBtnInner,
      ...btnStyles}}>
      <Text style={{
        ...styles.textBtnText,
        ...(disabled && {
          color: 'rgba(0, 0, 0, 0.26)'
        })
        }}>{text}</Text>
    </TouchableOpacity>
  );
}
export const PageButton = ({ text, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.pageButton}>
				<Text style={styles.pageButtonText}>{text}</Text>
			</View>
		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
  button:{
    height: 40,
    minWidth: 225,
    borderRadius:20,
    backgroundColor : "#ebecee",
    marginLeft :50,
    marginRight:50,
    marginTop :10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'roboto-700'
  },
  actionButton: {
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.13)',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconInner: {
    width: '15%'
  },
  actionButtonText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'roboto-400'
  },
  modalBtnInner: {
    paddingHorizontal: 14,
    paddingVertical: 8,

  },
  modalBtnText: {
    color: '#212223',
    fontFamily: 'roboto-400'
  },
  floatBtnInner: {
    height: 40,
    width: 40,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textBtnInner: {
    height: 40,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textBtnText: {
    color: '#6200EE',
    fontFamily: 'roboto-500',
    fontSize: 15,
    textTransform: 'uppercase'
  },
  containedButton: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200EE',
    borderRadius: 6,
    paddingHorizontal: 20,
    marginRight: 12,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
  },
  containedButtonText: {
    fontSize: 15,
    fontFamily: 'roboto-500',
    color: 'white',
    textTransform: 'uppercase'
  },
  outlinedButton: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#6200EE',
    borderRadius: 6,
    paddingHorizontal: 16,
    marginRight: 12
  },
  outlinedButtonText: {
    fontSize: 15,
    fontFamily: 'roboto-500',
    color: '#6200EE',
    textTransform: 'uppercase'
  },
  pageButton: {
		borderRadius: 6,
		paddingVertical: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: '85%',
		maxWidth: '85%',		
		marginBottom: 12,
		backgroundColor: '#F9F9F9'
	},
	pageButtonText: {
		fontFamily: 'roboto-500',
		fontSize: 16
	},

});
