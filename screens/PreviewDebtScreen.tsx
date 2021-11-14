import React, {useEffect, useState} from "react";
import { StyleSheet, TextInput } from "react-native";

import { Text, View } from "../components/Themed";
import Button from "../components/Button";

import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/core";
import CustomCheckBox from "../components/CheckBox";

import { TextInputMask } from 'react-native-masked-text'

const DEFAULT_COLOR = "rgb(250, 190, 52)";

const PreviewDebtScreen = () => {

	const navigation = useNavigation()
	const route = useRoute()

	const [debtData, setDebtData] = React.useState({
		debts: 2
	})

	const [phone, setPhone] = useState('')

	useEffect(() => {

	}, [])

	const handleNext = () => {
		navigation.navigate('Root')
	}

	const handleInput = (text: string) => {

	}

	return (
		<View style={styles.container}>

			<View style={{alignItems: 'center', justifyContent: 'center'}}>
				<Animatable.Text 
					style={styles.text}
					animation={'zoomIn'}
					duration={500}
				>Você possui
				</Animatable.Text>

				<Animatable.Text 
					style={[styles.text, {fontSize: 30, flexWrap: 'wrap', width: '100%',}]}
					animation={'zoomIn'}
					duration={500}
					delay={800}
				>{debtData.debts} dívidas pendentes
				</Animatable.Text>

				<Animatable.Text 
					style={[styles.text, {fontSize: 15}]}
					animation={'zoomIn'}
					duration={259}
					delay={1200}
				>Para ter acesso aos detalhes das suas pendências complete os campos abaixo:
				</Animatable.Text>
			</View>

			<Animatable.View 
				style={{width: '100%', alignItems: 'center', marginVertical: 10}}
				animation={'slideInUp'}
				duration={500}
			>

				<TextInput
					style={styles.input}
					placeholder={"Email"}
					keyboardType={"email-address"}
					onChangeText={handleInput}
				/>

				<TextInputMask
					type={'cel-phone'}
					options={{
						maskType: 'BRL',
						withDDD: true,
						dddMask: '(99) '
					}}
					style={styles.input}
					placeholder={"Telefone"}
					keyboardType={"numeric"}
					value={phone}
					onChangeText={setPhone}
				/>

				<TextInput
					style={styles.input}
					placeholder={"Nome Completo"}
					onChangeText={handleInput}
				/>
				<View style={{
					
				}}>
					<CustomCheckBox label={'Aceito os Termos de Uso e Política de Privacidade'}/>
					<CustomCheckBox label={'Aceito que o aplicativo utilize meus dados'}/>
				</View>
				<Button title={"Continuar"} onPress={handleNext} />
			</Animatable.View>
			
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		padding: 10,
		margin: 10,
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
	text: {
		fontSize: 20,
		// fontWeight: "bold",
		marginVertical: 10
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});

export default PreviewDebtScreen;
