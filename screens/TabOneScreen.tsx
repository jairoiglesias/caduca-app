import { useNavigation } from '@react-navigation/core';
import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';
import Text from '../components/Text'
import axios from 'axios'

import { AnimatedCircularProgress } from 'react-native-circular-progress';

const DEFAULT_COLOR = 'rgb(250, 190, 52)'

const TabOneScreen = () => {

  const navigation = useNavigation()
  const [listItems, setListItems] = useState([])

  const fetchList = async() => {
    const url = 'https://caduca.herokuapp.com/caduca/dividas-ativas'
    const response = await axios.get(url)
    setListItems(response.data)
    console.log(response.data.dividasAtivas)
  }

  useEffect(() => {
    fetchList()
  }, [])

  const handleItem = (item) => {
    navigation.navigate('OfferScreen', item)
  }

  const CardScore = ({points}) => {
    return (
      <View
        style={{
          borderRadius: 5,
          borderWidth: 0.3,
          width: '90%',
          margin: 10,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <Text style={{fontSize: 40}}>Score</Text>
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={28}
          tintColor={DEFAULT_COLOR}
          backgroundColor="#3d5875" 
        >{(fill) => (
            <Text>
              { points }
            </Text>
          )
        }
          </AnimatedCircularProgress>
      </View>
    )
  }

  const renderItem = ({item}) => {
    
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={() => handleItem(item)}>
        <View>
          <Text>Data: {item.data}</Text>
          <Text>Empresa: {item.empresaDivida}</Text>
          <Text>Recuperadora: {item.recuperadora}</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>R$ {item.valor}</Text>
          <Text style={{}}>Negociar</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de dividas ativas</Text>

      <CardScore points={listItems.pontuacao}/>
      <FlatList
        data={listItems.dividasAtivas}
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

export default TabOneScreen
