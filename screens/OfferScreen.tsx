import React, {useEffect, useState} from "react";
import { FlatList, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { View } from "../components/Themed";
import Button from "../components/Button";

import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import Text from "../components/Text";

const DEFAULT_COLOR = "rgb(250, 190, 52)";

const OfferScreen = () => {

	const navigation = useNavigation()
    const route = useRoute()

    const [offerData, setOfferData] = useState({})

    const fetchData = async() => {
        const id = route.params.id
        const url = `https://caduca.herokuapp.com/caduca/dividas-ativas/${id}`
        const response = await axios.get(url)
        console.log(response.data.divida)
        setOfferData(response.data.divida)
    }

    useEffect(() => {
        fetchData()
    }, [])

	const handleNext = () => {
		// navigation.navigate('Root', {cpf})
	}

    const handleItem = (item) => {
        console.log('handleItem', item)
    }

    const handleLookia = async () => {
        navigation.navigate('LookiaScreen')
    }

    const renderItem = ({item}) => {

        console.log('item', item)
    
        return (
          <TouchableOpacity style={styles.cardContainer} onPress={() => handleItem(item)}>
            <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={styles.cardItem}>
                    <Text style={{textAlign: 'center', height: 40}}>Quantidade Parcela</Text>
                    <Text style={{fontWeight: 'bold'}}>{item.quantidadeParcela}</Text>
                </View>
                <View style={styles.cardItem}>
                    <Text style={{textAlign: 'center', height: 40}}>Recuperadora</Text>
                    <Text style={{fontWeight: 'bold'}}>{item.recuperadora}</Text>
                </View>
                <View style={styles.cardItem}>
                    <Text style={{textAlign: 'center', height: 40}}>Valor Parcela</Text>
                    <Text style={{fontWeight: 'bold'}}>{item.valorParcela}</Text>
                </View>
            </View>
          </TouchableOpacity>
        )
      }

	return (
		<View style={styles.container}>
            <View style={{alignSelf: 'flex-start', margin: 20}}>
                <View style={styles.item}>
                    <Text>Data</Text>
                    <Text>{offerData.data}</Text>
                </View>

                <View style={styles.item}>
                    <Text>Empresa</Text>
                    <Text>{offerData.empresaDivida}</Text>
                </View>

                <View style={styles.item}>
                    <Text>Recuperadora</Text>
                    <Text>{offerData.recuperadora}</Text>
                </View>
                <View style={styles.item}>
                    <Text>Valor da Divida</Text>
                    <Text>{offerData.valor}</Text>
                </View>
            </View>

            <Text style={{fontSize: 15}}>Propostas</Text>
            <FlatList
                renderItem={renderItem}
                data={offerData.propostas}
            />

			<Animatable.View 
				style={{width: '100%', alignItems: 'center'}}
				animation={'slideInUp'}
			>
                <Text style={{fontSize: 15, marginHorizontal: 20, textAlign: 'center'}}>Gostaria de solicitar novas propostas através da utilização de Open Banking.</Text>
                
				<Button title={"Solicitar"} onPress={handleNext} />
                <Button title={"Consultar Risco no LOOKIA"} onPress={handleLookia} />
			</Animatable.View>
			
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
        marginBottom: 20
	},
    item: {
        marginVertical: 5,
    },
	input: {
		padding: 10,
		width: "90%",
		borderWidth: 1,
		borderColor: DEFAULT_COLOR,
		borderRadius: 10,
		shadowColor: "black",
		shadowOffset: {
			width: 1,
			height: 1,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 50
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
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
    },
    cardItem: {
        alignItems: 'center',
        // justifyContent: 'center',
        width: '33%',
    }
});

export default OfferScreen;
