import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {Map} from './Map'
import {Library} from './Library'
import {Bookmarks} from './Bookmarks'
import {User} from './User'
import {Lock} from './Lock'
import {Locks} from './Locks'
import {Actions} from './actions/Actions'
import {PersonelInfo} from './actions/PersonelInfo'
import {GoToSettings} from './actions/GoToSettings'
import { AddPoint } from './AddPoint/AddPoint'

import {HomeIcon, CalendarIcon, CubeIcon, UserIcon, PoketIcon} from './images/home_icon'
import {SearchPage} from './SearchPage';
import {Product} from './ProductPage/Product';
import {AddCreditCard} from './AddCreditCard';
import { IoniconsHeaderButton } from './ui/AppHeaderIcon'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


const animationConfig = {
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}

const BottomTabNavigator = createMaterialBottomTabNavigator({
  Map: {
    screen: Map,
    navigationOptions: {
      tabBarIcon: <HomeIcon size={24} color="black" />,
      tabBarLabel: 'Главная'
    },
  },
  Library: {
    screen: Library,
    navigationOptions: {
      tabBarIcon: <CubeIcon size={24} color="black" />,
      tabBarLabel: 'Категории'
    },
  },
  Lock: {
    screen: Locks,
    navigationOptions: {
      tabBarIcon: <PoketIcon size={24} color="black" />,
      tabBarLabel: 'Мой бизнес'	  
	  
    },
  },
  Bookmarks: {
    screen: Bookmarks,
    navigationOptions: {
      tabBarIcon: <CalendarIcon size={24} color="black" />,
      tabBarLabel: 'Записи'
    },
  },
  User: {
    screen: User,
    navigationOptions: {
      tabBarIcon: <UserIcon size={24} color="black" />,
      tabBarLabel: 'Профиль'
    },
  },
}, {
  labeled: true,
  shifting: false,
  inactiveColor: 'rgba(0,0,0,0.50)',
  activeColor: '#1D1D1B',
  barStyle: {
    backgroundColor: '#ffffff',
    borderColor: 'transparent',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    padding: 5
  }
})

const AppNavigator = createStackNavigator({
  Map: {
    screen: BottomTabNavigator,
    navigationOptions: {
      headerShown: false,
      ...animationConfig,
    },
  },
  Actions: {
    screen: Actions,
    navigationOptions: {
      headerShown: false,
      ...animationConfig,
    },
  },
  PersonelInfo: {
    screen: PersonelInfo,
    navigationOptions: {
      title: 'Edit Personel Info',
      ...animationConfig,
    },
  },
  
   GoToSettings: {
    screen: GoToSettings,
    navigationOptions: {
      title: 'Настройки',
      ...animationConfig,
    },
  },
  AddPoint: {
    screen: AddPoint,
    //screen: <></>,
    navigationOptions: {
      headerShown: false,
      ...animationConfig,
    },
  },
  Search: {
    screen: SearchPage,
    navigationOptions: {
      headerShown: false,
      ...animationConfig,
    }
  },
  AddCreditCard: {
    screen: AddCreditCard,
    navigationOptions: {   
      title: 'Add Payment Method',
      ...animationConfig,
    }
  },
  Product: {
    screen: Product,
    navigationOptions: {
      headerShown: true,
      ...animationConfig,
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item title="Like" iconName="ios-heart" />
            <Item title="Share" iconName="md-share" />
          </HeaderButtons>
        )
      }
    }
  },



})


export const BottomNavigator = createAppContainer(AppNavigator)
