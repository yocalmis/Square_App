import { observable, action, decorate } from 'mobx';
import * as SecureStore from 'expo-secure-store';
import { serialize } from 'object-to-formdata';
import { act } from 'react-test-renderer';
import { CategoryBuildIcon } from '../components/images/home_icon';
import {Platform} from 'react-native'




class Operations {
  BASE_URL = 'http://3.15.210.206:8080/'
  GOOGLE_API_KEY = 'AIzaSyCk7LQ8cPwBKzNpAjKKQyCbWLvY34ldWuU'
  state = 'done'
  token = null
  uuid = null
  BASE_URL_V2 = 'http://85.29.136.241:8080/api/v2/'
  isOwner = null
  user = null
  business_info = null
  business_entities = null
  geonim_id = null
  working_days_id = null
  uploadedImages = []
  

  async register(data, succsessCallback, erroCallback) {
    this.state = 'loading'
    try {
      const req = await fetch(`${this.BASE_URL_V2}user/registration`, {
        method: 'POST',
        body: serialize(data)
      })

      const res = await req.json() || req.text()
      const {errors, responce} = res
      const {login, password} = data

      if (errors) erroCallback(responce)
      else await this.login({ login, password }, succsessCallback, erroCallback)

      this.state = 'done'
    }
    catch (error) {
      erroCallback(error)
      this.state = 'done'
    }
  }


  async business_active(data, succsessCallback, erroCallback) {
    this.state = 'loading'
  
    try {
      const req = await fetch(`${this.BASE_URL_V2}business/create_business`, {
        method: 'POST',
        headers: {
          user_uuid: this.uuid,
          user_token: this.token
        },
        body: serialize({
          user_uuid: this.uuid
        })
      })

      const res = await req.json()
      const {errors, responce} = res

      if (errors) erroCallback(responce)
      else {
        responce.leader && (this.isOwner = true)
        succsessCallback && succsessCallback()
        await this.getUserInfo()
      }

      this.state = 'done'

      
    }
    catch (error) {
      erroCallback(error)
      this.state = 'done'
    }
    

  }
  async getUserInfo(data, succsessCallback, erroCallback) {
    this.state = 'loading'
  
    try {
      const req = await fetch(`${this.BASE_URL_V2}user/get_info/${this.uuid}`, {
        method: 'GET',
        headers: {
          user_uuid: this.uuid,
          user_token: this.token
        }
      })

      const res = await req.json()
      const {errors, responce} = res

      if (errors) this.user = null
      else this.user = responce
      
      this.state = 'done'
    }
    catch (error) {
      console.log(error)
      this.state = 'done'
    }
    

  }


  async login(data, succsessCallback, erroCallback) {
    this.state = 'loading'



    try {
      const req = await fetch(`${this.BASE_URL_V2}user/authorisation`, {
        method: 'POST',
        body: serialize(data)
      })

      const res = await req.json()
      const {errors, responce} = res
      if (errors) erroCallback(responce)
      else {
        const {token, uuid} = responce

        await this.setUUIDToStorage(uuid)
        await this.setTokenToStorage(token)
        succsessCallback()
      }

      this.state = 'done'
    }
    catch (error) {
      erroCallback(error)
      this.state = 'done'
    }
  }

  async getTokenFromStorage() {
    try {
      const token = await SecureStore.getItemAsync('token')
      this.token = token
    }
    catch {
      this.token = null
    }
  }
  async setTokenToStorage(token) {
    try {
      this.token = token
      const setItem = await SecureStore.setItemAsync('token', token)
    }
    catch {
      console.log('Oops some problems when setting key to storage')
    }
  }
  async removeTokenFromStorage() {
    try {
      this.token = null
      const removeItem = await SecureStore.deleteItemAsync('token')
    }
    catch {
      console.log('Oops some problems when deletings key to storage')
    }
  }
  async getUUIDFromStorage() {
    try {
      const uuid = await SecureStore.getItemAsync('uuid')
      this.uuid = uuid
    }
    catch {
      this.uuid = null
    }
  }
  async setUUIDToStorage(uuid) {
    try {
      this.uuid = uuid
      const setOwner = await SecureStore.setItemAsync('uuid', uuid)
    }
    catch {
      console.log('Oops some problems when setting key to storage')
    }
  }
  async removeUUIDFromStorage() {
    try {
      this.uuid = null
      const removeOwner = await SecureStore.deleteItemAsync('uuid')
    }
    catch {
      console.log('Oops some problems when deletings key to storage')
    }
  }
  async logout() {
    try {
      this.uuid = null
      this.token = null
      await SecureStore.deleteItemAsync('uuid')
      await SecureStore.deleteItemAsync('token')
    }
    catch {
      console.log('Oops some problems when logout')
    }
  }


  async getZipCode({coors, succsessCallback, erroCallback}) {
    try {
      const req = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coors.lat},${coors.lng}&key=${this.GOOGLE_API_KEY}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      const res = await req.json()
      const zipCode = res.results[0].address_components.filter(el => el.types[0] = "postal_code")
      succsessCallback(zipCode)

    }
    catch (error) {
      erroCallback(error)
    }
  }
  async getAddresByCoors({coors, succsessCallback, erroCallback}) {
    try {
      const req = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coors.lat},${coors.lng}&key=${this.GOOGLE_API_KEY}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      const res = await req.json()
      const address = res.results[0].formatted_address
      succsessCallback(address)

    }
    catch (error) {
      erroCallback(error)
    }
  }
  async getStreetByCoors({coors, succsessCallback, erroCallback}) {
    try {
      const req = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coors.lat},${coors.lng}&key=${this.GOOGLE_API_KEY}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      const res = await req.json()
      const streetName = res.results[0].address_components.find(address => address.types.includes('route')).long_name
      succsessCallback(streetName)

    }
    catch (error) {
      erroCallback(error)
    }
  }

  async fetchAPI({node, type, data, succsessCallback, erroCallback, settings }) {
    const config = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }

    if (settings && settings.withoutToken) config["x-access-token"] = this.token

    try {
      const req = await fetch(`${BASE_URL}api/${node}`, {
        method: type,
        headers: config,
        body: JSON.stringify(data)
      })

      const res = await req.json()

      if (res.success) succsessCallback(res.content)
      else if (res.error) res.errors.forEach(err => erroCallback(err))

    }
    catch (error) {
      erroCallback(error)
    }
  }
  places = []
  async getPlaces() {
    console.log({
      user_token: this.token,
      user_uuid: this.uuid,
    })
    try {
      const req = await fetch(`${this.BASE_URL_V2}entity/get_all_for_map/1`, {
        method: 'GET',
        headers: {
          user_uuid: this.uuid,
          user_token: this.token
        }
      })
      
      const res = await req.json()
      const {errors, responce} = res
      if (errors) console.log(responce)
      else {
        this.places = responce
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  getPlacesById(uuid) {
    return this.places.find(item => item.uuid === uuid)
  }
  getBusinnesPlaces(uuid) {
    return this.business_entities.find(item => item.uuid === uuid)
  }
  changePlaceDataById(uuid, newData) {
    const elIndex = this.places.findIndex(item => item.uuid === uuid)
    const el = this.places.find(item => item.uuid === uuid)
    return this.places[elIndex] = {...newData, ...el}
  }
  async getPlaceInfo(id) {
    try {
      const req = await fetch(`${this.BASE_URL_V2}entity/get_info/${id}`, {
        method: 'GET',
        headers: {
          user_uuid: this.uuid,
          user_token: this.token
        }
      })
      
      const res = await req.json() || req.text()
      const {errors, responce} = res
      if (errors) console.log(responce)
      else {
        this.changePlaceDataById(id, responce)
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  categories = null
  async fetchCategories() {
    try {
      const req = await fetch(`${this.BASE_URL_V2}category/get_all`, {
        method: 'GET',
        headers: {
          user_uuid: this.uuid,
          user_token: this.token
        }
      })
      
      const res = await req.json() || req.text()
      const {errors, responce} = res
      if (errors) console.log(responce)
      else {
        this.categories = responce
        responce.forEach(category => this.fetchCategoryTypes(category.id))
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  async fetchCategoryTypes(id) {
    try {
      const req = await fetch(`${this.BASE_URL_V2}entity_type/get_all/${id}`, {
        method: 'GET',
        headers: {
          user_uuid: this.uuid,
          user_token: this.token
        }
      })
      
      const res = await req.json() || req.text()
      const {errors, responce} = res
      if (errors) console.log(responce)
      else {
        const categoryIndex = this.categories.findIndex(item => item.id === id)
        this.categories[categoryIndex]["types"] = responce
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  async addGeonim({coordinates, title, house_number, succsessCallback}) {
    console.log('adding geonim')
    try {
      const req = await fetch(`${this.BASE_URL_V2}/geonim/add`, {
        method: 'POST',
        headers: {
          user_uuid: this.uuid,
          user_token: this.token
        },
        body: serialize({
          locality_id: 1,
          title: title || 'Lorem Ipsum',
          house_number: house_number || 0,
          lat: coordinates.latitude,
          lng: coordinates.longitude
        })
      })
      
      const res = await req.json()
      const {errors, responce} = res
      if (errors) {
        console.log('adding geonim: error : errors', responce)
        return false
      }
      else {
        const {id} = responce
        this.geonim_id = id
        succsessCallback && succsessCallback(id)
        console.log('adding geonim: successfull')
        return true
      }
    }
    catch (error) {
      console.log('adding geonim: error : catch', error)
    }
  }
  async addWorkDays({work_days, succsessCallback}) {
    console.log('adding work days', work_days)
    try {
      const req = await fetch(`${this.BASE_URL_V2}work_day/add`, {
        method: 'POST',
        headers: {
          user_uuid: this.uuid,
          user_token: this.token
        },
        body: serialize({ work_days: JSON.stringify(work_days) })
      })
      
      const res = await req.json()
      const {errors, responce} = res
      if (errors) {
        console.log('adding work days: error : errors', responce)
        return false
      }
      else {
        const {id} = responce
        this.working_days_id = id
        succsessCallback && succsessCallback(id)
        console.log('adding work days: successfull')
        return true
      }
    }
    catch (error) {
      console.log('adding work days: error : catch', error)
    }
  }
  async addEntity({data, succsessCallback}) {
    console.log('adding entyty')
    const object = this.addEntityObject({
      object: data,
      exclude: ['coordinates', 'work_days']
    })
    try {
      const req = await fetch(`${this.BASE_URL_V2}entity/add`, {
        method: 'POST',
        headers: {
          user_uuid: this.uuid,
          user_token: this.token
        },
        body: serialize(object, {indices: true, allowEmptyArrays: true})
      })
      
      const res = await req.json()
      const {errors, responce} = res
      if (errors) {
        console.log('adding entity: error : errors', responce)
      }
      else {
        succsessCallback && succsessCallback(responce)
        console.log('adding entity: succesfull', responce)
      }
    }
    catch (error) {
      console.log('adding entity: error : catch', error)
    }
  }

  async uploadImage({image, succsessCallback}) {
    console.log('uploading image')
    const {path, mime} = image
    const fileName = this.getFileName(path)

    let body = new FormData();
    body.append('image_data', {
      name: fileName,
      type: mime,
      uri: Platform.OS === 'android' ? path : path.replace('file://', '')
    });
    body.append('title', fileName)

    try {
      const req = await fetch(`${this.BASE_URL_V2}image/upload`, {
        method: 'POST',
        headers: {
          user_uuid: this.uuid,
          user_token: this.token,
          'Content-Type': 'multipart/form-data',
        },
        body
      })
      
      const res = await req.json()
      const {errors, responce} = res
      if (errors) {
        console.log('uploading image: error : errors', responce)
        return false
      }
      else {
        console.log('uploading image: successfull', responce)
        const {uuid} = responce
        this.uploadedImages.push(uuid)
        succsessCallback && succsessCallback()
        return true
      }
    }
    catch (error) {
      console.log('uploading image: error : catch', error)
    }
  }
  async pushEntity({config, succsessCallback}) {
    this.state = 'loading'
    const {work_days, coordinates, images_list, data} = config
    const converted_data = this.convertParametreData(data)

    try {
      const dataValidity = await Promise.all([
        ...images_list.map(image => this.uploadImage({image})),
        this.addGeonim({coordinates}),
        this.addWorkDays({work_days})
      ])
      if (!dataValidity.includes(false)) {
        await this.addEntity({
          data: {
            working_days_id: this.working_days_id,
            geonim_id: this.geonim_id,
            ...config,
            ...{
              images_list: JSON.stringify(this.uploadedImages),
              data: converted_data
            },
            business_uuid: this.user.worker.business_uuid
          }, succsessCallback})
      }
      else {
        console.log('pushEntity : error : lack of data')
      }

    }
    catch (error) {
      console.log('pushEntity: error : catch', error)
    }
    this.uploadedImages = []
    this.working_days_id = null
    this.geonim_id = null
    this.state = 'done'
  }
  async getBusinnesEntity() {
    console.log('getting entity for businness')
    try {
      const req = await fetch(`${this.BASE_URL_V2}entity/get_all_for_business/${this.user.worker.business_uuid}`, {
        method: 'GET',
        headers: {
          user_uuid: this.uuid,
          user_token: this.token
        }
      })
      
      const res = await req.json()
      const {errors, responce} = res
      if (errors) {
        console.log('getting entity for businness: error : errors', responce)
      }
      else {
        this.business_entities = responce
        console.log('getting entity for businness: succesfull')
      }
    }
    catch (error) {
      console.log('getting entity for businness: error : catch', error)
    }
  }
  async getBusinnesInfo() {
    console.log('getting businness info')

    try {
      const req = await fetch(`${this.BASE_URL_V2}business/get_info/${this.user.worker.business_uuid}`, {
        method: 'GET',
        headers: {
          user_uuid: this.uuid,
          user_token: this.token
        }
      })
      
      const res = await req.json()
      const {errors, responce} = res
      if (errors) {
        console.log('getting businness info: error : errors', responce)
      }
      else {
        this.business_info = responce
        console.log('getting businness info: succesfull', responce)
      }
    }
    catch (error) {
      console.log('getting businness info: error : catch', error)
    }
  }

  getFileName(uri) {
    return uri.substring(uri.lastIndexOf('/') + 1, uri.length)
  }
  addEntityObject({object, exclude}) {
    const newObject = {...object}
    exclude.forEach(item => {
      delete newObject[item]
    })
    return newObject
  }
  convertParametreData(data) {
    const old = [...data];
    const newData = {};
      
    for (let id of old) {
      const item = Object.entries(id)[0];
      newData[item[0]] = item[1]
    }
    return newData
  }

}

Operations = decorate(Operations, {
  state: observable,
  register: action,
  login: action,
  token: observable,
  isOwner: observable,
  owner: observable,
  places: observable,
  categories: observable,
  user: observable,
  working_days_id: observable,
  geonim_id: observable,
  uploadedImages: observable,
  business_info: observable,
  business_entities: observable,
  getTokenFromStorage: action,
  setTokenToStorage: action,
  removeTokenFromStorage: action,
  getOwnerStatusFromStorage: action,
  setOwnerStatusToStorage: action,
  removeOwnerStatusFromStorage: action,
  getAddresByCoors: action,
  getPlacesById: action,
  business_active: action,
  changePlaceDataById: action,
  getPlaceInfo: action,
  getUserInfo: action,
  fetchCategories: action,
  fetchCategoryTypes: action,
  addEntity: action,
  addGeonim: action,
  addWorkDays: action,
  uploadImage: action,
  addEntityObject: action,
  convertParametreData: action,
  pushEntity: action,
  getBusinnesEntity: action,
  getBusinnesInfo: action,
  getBusinnesPlaces: action
})
export default new Operations()
