import React from 'react'
import { Text as TextBase, StyleSheet } from 'react-native'

const Text: React.FC = (props) => {
    return <TextBase style={styles.text} {...props}>{props.children}</TextBase>
}

const styles = StyleSheet.create({
    text: {
        fontSize: 13,
    }
})

export default Text