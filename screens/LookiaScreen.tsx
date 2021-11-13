import React, {useEffect, useState} from "react";
import { FlatList, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";

import { View } from "../components/Themed";
import Button from "../components/Button";

import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import Text from "../components/Text";

import LogoLookia from '../assets/logo-lookia.jpeg'

const DEFAULT_COLOR = "rgb(250, 190, 52)";

const LookiaScreen = () => {

	const navigation = useNavigation()
    const route = useRoute()

    const [lokkiaData, setLookiaData] = useState({})

    const fetchData = async () => {
        const url = `https://caduca.herokuapp.com/caduca/consulta-lookia/45084552802`
        const response = await axios.get(url)
        console.log(response.data)
        setLookiaData(response.data.data)
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
        const url = `https://caduca.herokuapp.com/caduca/consulta-lookia/45084552802`
        const response = await axios.get(url)
        console.group(response.data)
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

            <Image 
                source={LogoLookia}
            />
            <View style={{margin: 10, width: '90%'}}>
                <View style={styles.item}>
                    <Text>Classificação:</Text>
                    <Text>{lokkiaData.classificacao}</Text>
                </View>

                <View style={styles.item}>
                    <Text>Descrição Classificação:</Text>
                    <Text>{lokkiaData.descricaoClassificacao}</Text>
                </View>

                <View style={styles.item}>
                    <Text>Fator Moderador:</Text>
                    <Text>{lokkiaData.fatorModerador}</Text>
                </View>
                <View style={styles.item}>
                    <Text>Grupo de Risco:</Text>
                    <Text>{lokkiaData.grupoRisco}</Text>
                </View>
                <View style={styles.item}>
                    <Text>Nivel de Empregabilidade:</Text>
                    <Text>{lokkiaData.nivelEmpregabilidade}</Text>
                </View>
                <View style={styles.item}>
                    <Text>Percentual de Risco:</Text>
                    <Text>{lokkiaData.percentualRisco}</Text>
                </View>
            </View>

            <Text style={{marginTop: 100, fontSize: 15, marginHorizontal: 20, textAlign: 'center', fontStyle: 'italic'}}>* Esta visualização é apenas um demonstrativo de consumo de API do Lookia, essas informações serão consultadas apenas no Back-end</Text>
			
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
        flexDirection: 'row',
        justifyContent: 'space-between'
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

export default LookiaScreen;
