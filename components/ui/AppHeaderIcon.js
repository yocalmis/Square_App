import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderButton } from 'react-navigation-header-buttons';

export const IoniconsHeaderButton = (props) => (
    <HeaderButton {...props} IconComponent={Ionicons} iconSize={24} color="#737672" />
);