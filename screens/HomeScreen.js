import React, { Component } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import Post from '../components/Post'

class HomeScreen extends Component {

    state = {
        fontLoaded: false,
        posts: [{
            id: Math.random(),
            name: 'Picanha Fresca',
            price: 'R$ 47,90 Kg',
            image: require('../assets/images/picanha.jpg')
        }, {
            id: Math.random(),
            name: 'Maminha',
            price: 'R$ 29,99 kg',
            image: require('../assets/images/maminha.jpg')
        }]
    }   

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => 
                        <Post key={item.id} {...item} />
                    } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
})

export default HomeScreen