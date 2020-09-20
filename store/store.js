import {observable, action, decorate, computed} from 'mobx'
import { Dimensions } from 'react-native';


class Store {
  screenWidth = Math.round(Dimensions.get('window').width)
  screenHeight = Math.round(Dimensions.get('window').height)
  location = null
  userIp = null
  locationByAPI = null

  setLocation(coordinates) {
    return this.location = coordinates
  }
  setIpAdress(ip) {
    return this.userIp = ip
  }
  setLocationByAPI({latitude, longitude}) {
    return this.location = {latitude, longitude}
  }
  validableInputs = {
    validInputs: {
      username: false,
      password: false,
      passwordRepeat: false
    },
    loginInputs: {
      username: false,
      password: false
    },
    modalInputs: {
      mapPointTitle: false,
      mapPointId: false
    },
    perconelInfoInputs: {
      name: false,
      surname: false,
      sex: false,
      email: false,
      inn: false,
    },
    stepsFirst: {
      name: false,
      desc: false,
    },
    parametres: {}
  }
  changeValidInput(key, value, group) {
    return this.validableInputs[group][key] = value
  }
  changeValidGrup(value, group) {
    return this.validableInputs[group] = value
  }
  isAllValid(group) {
    return Object.values(this.validableInputs[group]).includes(false)
  }
  mapPageFlag = false
  setMapPageFlag(boolean) {
    return this.mapPageFlag = boolean
  }


  places = [
    {
      id: 1,
      name: 'Mehmet Şimşek',
      type: 'Super Market',
      feedBack: {
        stars: 4.1,
        peopleCount: 5
      },
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      latitude: 38.764888,
      longitude: 35.605685,
      image: require('../assets/images/1.jpg'),
      images: [
        require('../assets/images/1.jpg'),
        require('../assets/images/2.jpg'),
        require('../assets/images/3.jpg'),
        require('../assets/images/4.jpg')
      ],
      price: '120',
      priceCurrency: '$',
      phoneNumber: '0 (352) 222 25 32',
      categories: ["Наличный расчет", "Оплата через банк", "Оплата через интернет", "WIFI", "Душ", "Кровать"]
    },
  ]
  getPlacesById(id) {
    return this.places.find(item => item.id === id)
  }
}

Store = decorate(Store, {
  screenWidth: observable,
  screenHeight: observable,
  location: observable,
  userIp: observable,
  places: observable,
  locationByAPI: observable,
  validableInputs: observable,
  mapPageFlag: observable,
  setLocation: action,
  setIpAdress: action,
  setLocationByAPI: action,
  changeValidInput: action,
  isAllValid: action,
  setMapPageFlag: action,
  getPlacesById: action,
  changeValidGrup: action
})

export default new Store()
