import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const DEFAULT_COLOR = 'rgb(250, 190, 52)'

const Button = ({
    title = '',
    onPress
}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DEFAULT_COLOR,
        width: '90%',
        padding: 10,
        borderRadius: 10,
        margin: 10
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold'
    }
})

export default Button