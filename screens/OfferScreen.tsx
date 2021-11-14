import React, {useEffect, useState} from "react";
import { Alert, FlatList, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { View } from "../components/Themed";
import Button from "../components/Button";

import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import Text from "../components/Text";

const DEFAULT_COLOR = "rgb(250, 190, 52)";
const DEFAULT_COLOR_V2 = "rgb(243, 210, 132)";

const OfferScreen = () => {

	const navigation = useNavigation()
    const route = useRoute()

    const [offerData, setOfferData] = useState({})

    const fetchData = async() => {
        const id = route.params.id
        const url = `https://caduca.herokuapp.com/caduca/dividas-ativas/${id}`
        const response = await axios.get(url)
        console.log(response.data)

        const updatedPropostas = [
            ...response.data.divida.propostas,
            {
                "quantidadeParcela": 'A Vista',
                "if": "Santander",
                "valorEmprestimo": "200,00",
            }
        ]

        const updatedOffer = {
            ...response.data.divida,
            propostas: updatedPropostas
        }

        setOfferData(updatedOffer)
    }

    useEffect(() => {
        fetchData()
    }, [])

	const handleNext = () => {
		Alert.alert('Solicitação realizada com sucesso!')
	}

    const handleItem = (item) => {
        console.log('handleItem', item)
    }

    const handleLookia = async () => {
        navigation.navigate('LookiaScreen')
    }


    const CardParcela = ({item}) => {
        return (
            <TouchableOpacity style={styles.cardContainer} onPress={() => handleItem(item)}>
            <View style={{flexDirection: 'row', width: '100%', padding: 5}}>
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
            <View style={{width: '100%', backgroundColor: DEFAULT_COLOR_V2}}>
                <Text style={{textAlign: 'center', padding: 5}}>Iniciar Negociação</Text>    
            </View>
          </TouchableOpacity>
        )
    }

    const CardBanco = ({item}) => {
        return (
            <TouchableOpacity style={styles.cardContainer} onPress={() => handleItem(item)}>
            <View style={{flexDirection: 'row', width: '100%', padding: 5}}>
                <View style={styles.cardItem}>
                    <Text style={{textAlign: 'center', height: 40}}>Quantidade Parcela</Text>
                    <Text style={{fontWeight: 'bold'}}>{item.quantidadeParcela}</Text>
                </View>
                <View style={styles.cardItem}>
                    <Text style={{textAlign: 'center', height: 40}}>Inst. Finan.</Text>
                    <Text style={{fontWeight: 'bold'}}>{item.if}</Text>
                </View>
                <View style={styles.cardItem}>
                    <Text style={{textAlign: 'center', height: 40}}>Valor Emprestimo</Text>
                    <Text style={{fontWeight: 'bold'}}>{offerData.valor}</Text>
                </View>
            </View>
            <View style={{width: '100%', backgroundColor: DEFAULT_COLOR_V2}}>
                <Text style={{textAlign: 'center', padding: 5}}>Iniciar Negociação</Text>    
            </View>
          </TouchableOpacity>
        )
    }

    const renderItem = ({item}) => {

        console.log('item', item)
        
        if(item.recuperadora) return <CardParcela item={item} />
        if(item.if) return <CardBanco item={item} />
      }

	return (
		<View style={styles.container}>
            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between', width: '100%'}}>
                <View style={styles.item}>
                    <Text>Data</Text>
                    <Text>{offerData.data}</Text>
                </View>

                <View style={styles.item}>
                    <Text>Empresa</Text>
                    <Text>{offerData.empresaDivida}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between', width: '100%'}}>
                <View style={styles.item}>
                    <Text>Recuperadora</Text>
                    <Text>{offerData.recuperadora}</Text>
                </View>
                <View style={styles.item}>
                    <Text>Valor da Divida</Text>
                    <Text>{offerData.valor}</Text>
                </View>
            </View>

            <View style={{borderBottomWidth: 1, width: '90%', margin: 20}}/>
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
        marginBottom: 20,
	},
    item: {
        marginVertical: 5,
        marginHorizontal: 20,
        width: 100
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
        margin: 5,
    },
    cardItem: {
        alignItems: 'center',
        // justifyContent: 'center',
        width: '33%',
    }
});

export default OfferScreen;
