import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, TextInput, TouchableOpacityBase, ScrollView, Constants } from 'react-native';
import {SearchIcon, SettingsIcon} from './images/home_icon'
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';


const CategoryElement = ({title, buttons}) => {
  return (
    <View style={styles.categoryElInner}>
      <Text style={styles.categoryElInnerTitle}>{title}</Text>
      <View style={styles.categoryElBtnInner}>
        {buttons.map((button, index) => {
          return (
            <TouchableOpacity key={index}>
              <View style={styles.categoryElBtn}>
                <Text style={styles.categoryElBtnText}>{button}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export const SearchBar = ({navigation, isFromOutside}) => {
  const [isVisible, setVisible] = useState(false)
  const searchInput = useRef(null)
  useEffect(() => {
    !isFromOutside && searchInput.current.focus()
  }, [])
  const closModal = () => setVisible(false)
  return (
    <>
    <View style={styles.container}>
        <View style={styles.searchBar}>
          {isFromOutside ? 
            (<TouchableOpacity style={styles.searchBarBtn} onPress={() => navigation.navigate('Search')}>
              <Text style={styles.searchBarText}>Поиск..</Text>
            </TouchableOpacity>)
            :
            <TextInput ref={searchInput} placeholder="Поиск.."/>
          }
          
        </View>
        <View style={styles.settings}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <SettingsIcon size={24} color="black" />
          </TouchableOpacity>
        </View>
    </View>
    <Modal 
    isVisible={isVisible} 
    onBackButtonPress={closModal} 
    onBackdropPress={closModal} 
    style={{margin: 0}} 
    animationOut="fadeOutRight"
    animationIn="fadeInRight">
        <View style={styles.modalInner}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Фильтры</Text>
            <TouchableOpacity onPress={closModal}>
              <Ionicons name="md-close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView>
          <View style={styles.modalContent}>
            <CategoryElement title="Сортировка" buttons={['Рейтинг', 'Рядом']} />
            <CategoryElement title="Время работы" buttons={['Открыто', 'Круглосуточно']} />
            <CategoryElement title="Способы оплаты" buttons={['Наличный расчет', 'По картам']} />
            <CategoryElement title="Информация" buttons={['Сайт', 'Социальные сети']} />
            <CategoryElement title="Вид заведения" buttons={['Кафе', 'Автомойки']} />
            <CategoryElement title="Услуги" buttons={['Ланч', 'WI-FI', 'Аренда']} />
            <CategoryElement title="Средний чек" buttons={['от', 'до']} />
            <CategoryElement title="Забронировать" buttons={['Забронировать', 'Пин код']} />
          </View>
          </ScrollView>
          <TouchableOpacity onPress={closModal} style={styles.footerButtonInner}>
              <Text style={styles.footerButtonText}>Показать результаты</Text>
          </TouchableOpacity>
          
        </View>
    </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderRadius: 8,
    position: 'absolute',
    top: 10,
    right: 8,
    left: 8,
    zIndex: 2,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  searchBar: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginLeft: 8,
    minHeight: 40,
    width: '85%',
    alignItems: 'center'
  },
  searchBarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  searchBarText: {
    color: 'rgba(0,0,0,0.50)'
  },
  settings: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalInner: {
    width: '80%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    right: 0
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.13)',
  },
  modalTitle: {
    fontFamily: 'roboto-700',
    fontSize: 22
  },
  categoryElInner: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginBottom: 12
  },
  categoryElInnerTitle: {
    fontFamily: 'roboto-500',
    fontSize: 12,
    color: '#999999',
    marginBottom: 12
  },
  categoryElBtnInner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  categoryElBtn: {
    borderColor: 'rgba(0,0,0,0.13)',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 6,
    borderRadius: 22,
    textAlign: 'center'
  },
  categoryElBtnText: {
    color: '#212224',
    fontFamily: 'roboto-400'
  },
  footerButtonInner: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.13)'
  },
  footerButtonText: {
    fontFamily: 'roboto-500',
    fontSize: 16
  }
});
