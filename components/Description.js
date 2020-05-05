import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default props => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.price}>{props.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: '#444',
        marginVertical: 10,
        paddingLeft: 10,
        paddingRight: 15,
        fontSize: 15,
    },
    price: {
        color: '#444',
        marginVertical: 10,
        fontSize: 15,
        fontWeight: 'bold',
    }
})