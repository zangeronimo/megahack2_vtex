import React from 'react';
import { StyleSheet, Text,Button, View ,TouchableOpacity,TextInput, Alert,Dimensions,Image } from 'react-native';
import { Camera as Cam } from 'expo-camera';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Post from './Post'

export default class Camera extends React.Component {
    state = {
        item: null,
        hasPermission: null,
        cameraType: Cam.Constants.Type.back,
      }
    
      async componentDidMount() {
        this.getPermissionAsync()
      }
    
      getPermissionAsync = async () => {
        // Camera Permission
        const { status } = await Cam.requestPermissionsAsync();
        this.setState({ hasPermission: status === 'granted' });
      }
    
      handleCameraType=()=>{
        const { cameraType } = this.state
    
        this.setState({cameraType:
          cameraType === Cam.Constants.Type.back
          ? Cam.Constants.Type.front
          : Cam.Constants.Type.back
        })
      }        
    
      takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          let item = {
            id: Math.random(),
            name: 'Nome do produto',
            price: 'Preço do produto',
            image: {uri: photo.uri},
          }
          this.setState({ item })
        }
      }
    
      pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
        let item = {
          id: Math.random(),
          name: 'Nome do produto',
          price: 'Preço do produto',
          image: {uri: result.uri}
        }
        this.setState({ item })        
      }

      handleAddComment = () => {
          Alert.alert('Adicionado!', `${this.state.item.name} - ${this.state.item.price}`)
      }
      
      render(){
        if (this.state.item) {
            return (
                <View style={styles.container}>
                    <View style={styles.photo}>
                        <Image source={this.state.item.image} style={styles.image} />
                    </View>
                    <View style={styles.name}>
                        <TextInput placeholder='Nome do produto...'
                                style={styles.input} autoFocus={false}
                                value={this.state.item.name}
                                onChangeText={name => {
                                    let item = this.state.item
                                    item.name = name
                                    this.setState({ item })
                                }} />
                    </View>
                    <View style={styles.price}>
                        <TextInput placeholder='Preço do produto...'
                                style={styles.input} autoFocus={false}
                                value={this.state.item.price}
                                onChangeText={price => {
                                    let item = this.state.item
                                    item.price = price
                                    this.setState({ item })
                                }} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Publicar" onPress={() => this.handleAddComment()} />
                    </View>
                </View>
            )
        } else {
            const { hasPermission } = this.state
            if (hasPermission === null) {
                return <View />;
            } else if (hasPermission === false) {
                return <Text>No access to camera</Text>;
            } else {
            return (
                <View style={styles.container}>
                    <Cam style={{ flex: 1 }} type={this.state.cameraType}  ref={ref => {this.camera = ref}}>
                    <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:30}}>
                        <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent'                 
                        }}
                        onPress={()=>this.pickImage()}>
                        <Ionicons
                            name="ios-photos"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}
                        onPress={()=>this.takePicture()}
                        >
                        <FontAwesome
                            name="camera"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}
                        onPress={()=>this.handleCameraType()}
                        >
                        <MaterialCommunityIcons
                            name="camera-switch"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                        </TouchableOpacity>
                    </View>
                    </Cam>
                </View>
            );
            }
        }
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    photo: {
        flex: 1,
    },
    name: {
        padding: 5,
    },
    price: {
        padding: 5,
        marginBottom: 40,
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: 'contain'
    }
})