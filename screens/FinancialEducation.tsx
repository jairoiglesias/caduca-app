import { useNavigation } from '@react-navigation/core';
import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';
import Text from '../components/Text'
import axios from 'axios'
import { Video, AVPlaybackStatus } from 'expo-av';

const DEFAULT_COLOR = 'rgb(250, 190, 52)'

const FinancialEducation = () => {

  const navigation = useNavigation()
  const [listItems, setListItems] = useState([])

  const fetchList = async() => {
    const url = 'https://caduca.herokuapp.com/caduca/educacao-financeira-list'
    const response = await axios.get(url)
    setListItems(response.data)
    console.log(response.data.links)
  }

  useEffect(() => {
    fetchList()
  }, [])

  const handleItem = (item) => {

  }

  const renderItem = ({item}) => {
    
    return (
      <View style={styles.cardContainer} onPress={() => handleItem(item)}>
        
        <Text>Pontuacao: {item.pontuacao}</Text>
        <Video
          // ref={video}
          style={{
            width: 150,
            height: 100,
          }}
          source={{
            uri: item.url,
          }}
          useNativeControls
          // resizeMode="contain"
          // isLooping
          // onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de dividas pagas</Text>
      
      <FlatList
        data={listItems.links}
        renderItem={renderItem}
        style={styles.flatlist}
      />

        {/* <Video
            // ref={video}
            style={{
              width: 150,
              height: 150,
            }}
            source={{
              uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
          /> */}
      
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

export default FinancialEducation
