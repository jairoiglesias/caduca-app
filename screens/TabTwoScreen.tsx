import { useNavigation } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';
import Text from '../components/Text'
import axios from 'axios'

const DEFAULT_COLOR = 'rgb(250, 190, 52)'

const TabTwoScreen = () => {

  const navigation = useNavigation()
  const [listItems, setListItems] = useState([])

  const fetchList = async() => {
    const url = 'https://caduca.herokuapp.com/caduca/dividas-pagas'
    const response = await axios.get(url)
    setListItems(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchList()
  }, [])

  const handleItem = (item) => {

  }

  const renderItem = ({item}) => {
    
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={() => handleItem(item)}>
        <View>
          <Text>Data: {item.data}</Text>
          <Text>Empresa: {item.empresaDivida}</Text>
          <Text>Recuperador: {item.recuperadora}</Text>
          <View style={{
            flexDirection: 'row',
            marginVertical: 10,
            padding: 5,
            borderRadius: 5,
            backgroundColor: '#edcc80'
          }}>
            <Text style={{
              color: 'white', 
              fontSize: 10, 
              marginHorizontal: 5,
              fontWeight: 'bold'
            }}>Data Pagamento: {item.dataPagamento}</Text>
            
            <Text style={{
              color: 'white', 
              fontSize: 10, 
              marginHorizontal: 5,
              fontWeight: 'bold',
            }}>Valor Pago: R$ {item.valorPago}</Text>
            
          </View>
        </View>
        
        <View>
          <Text style={{
            position: 'absolute', 
            fontSize: 20, 
            fontWeight: 'bold',
            right: 15,
            top: 10
            }}>R$ {item.valorDivida}</Text>

          <View 
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              width: 120,
              position: 'absolute',
              right: 15,
              top: 25
            }}
          />
        </View>
        
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de dividas pagas</Text>
      
      <FlatList
        data={listItems.dividasPagas}
        renderItem={renderItem}
        style={styles.flatlist}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    width: '100%'
  },
  cardContainer: {
    borderWidth: 1,
		borderColor: DEFAULT_COLOR,
		borderRadius: 10,
    width: "90%",
    alignSelf: 'center',
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default TabTwoScreen
