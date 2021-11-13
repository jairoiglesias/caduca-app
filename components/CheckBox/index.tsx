import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { MaterialIcons, Feather } from "@expo/vector-icons";


const SELECTED_COLOR = "rgb(250, 190, 52)";
const UNSELECTED_COLOR = "gray"

const CustomCheckBox: React.FC = (props) => {
	const [isSelected, setSelection] = useState(false);

	const handleChange = () => {
		setSelection(!isSelected);
		if (props.onValueChange) {
			props.onValueChange(!isSelected);
		}
	};

	useEffect(() => {
		setSelection(props.selected)
	}, [props.selected])

	return (
		<TouchableOpacity onPress={handleChange}>
			<View
				style={[
					{
						flexDirection: "row",
						marginVertical: 10,
						height: 40,
					},
					props.containerStyle,
				]}
			>
				<TouchableOpacity
					onPress={handleChange}
					style={{
						marginTop: 8,
						marginRight: 5,
					}}
				>
					{isSelected && <Feather name="check-circle" size={30} color={SELECTED_COLOR} />}
					{!isSelected && (
						<MaterialIcons name="radio-button-unchecked" size={30} color={UNSELECTED_COLOR} />
					)}
				</TouchableOpacity>

				<Text
					style={{
						marginTop: 15,
					}}
				>
					{props.label}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CustomCheckBox;
