import * as React from "react";
import { StyleSheet, TextInput, Image, KeyboardAvoidingView } from "react-native";

import { Text, View} from "../components/Themed";
import Button from "../components/Button";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/core";

import { TextInputMask } from 'react-native-masked-text'

import LogoCaduca from '../assets/logo-caduca.png'

const DEFAULT_COLOR = "rgb(250, 190, 52)";

const CpfScreen = () => {

	const navigation = useNavigation()
	const [cpf, setCpf] = React.useState('')

	const handleNext = () => {
		navigation.navigate('PreviewDebtScreen', {cpf})
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
		<View style={styles.container}>
			<Animatable.Image 
				source={LogoCaduca} 
				animation={'zoomIn'}
				duration={500}
				delay={500}
			/>
			<Animatable.Text 
				style={styles.title}
				animation={'slideInDown'}
			>Informe o seu CPF
			</Animatable.Text>

			<Animatable.View 
				style={{width: '100%', alignItems: 'center'}}
				animation={'slideInUp'}
			>

				<TextInputMask
					type={'cpf'}
					style={styles.input}
					placeholder={"CPF"}
					keyboardType={"numeric"}
					onChangeText={setCpf}
					value={cpf}
				/>

				<Button title={"Continuar"} onPress={handleNext} />
			</Animatable.View>
			
		</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: "center",
		justifyContent: "center",
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
});

export default CpfScreen;
