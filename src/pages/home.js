import React, { Component } from 'react'
import {
    Alert,
    Button,
    KeyboardAvoidingView,
    ImageBackground, Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native'
import backgroundImage from '../../assets/imgs/login15.jpg'
import { Avatar, Badge, SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable';


export default class Home extends Component {

    state = {
        search: ''
    }
    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <View style={styles.containerPricipal}>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={styles.container}>
                            <View style={styles.iconBar}>
                                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                    <Icon name='bars'
                                        size={30} color='black' />
                                </TouchableOpacity>
                                <KeyboardAvoidingView
                                    behavior={null}>
                                    <View style={styles.viewSearch}>
                                        <Text style={styles.categoria}>Menu</Text>
                                        
                                    </View>
                                </KeyboardAvoidingView>
                            </View>

                            <View style={styles.corpo}>
                                <View style={styles.row1}>
                                    <Animatable.View
                                        animation="zoomInDown" duration={3000} style={styles.icon1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps', { categoria: 'barbearia' })}>
                                            <Avatar
                                                size="xlarge" rounded
                                                source={{
                                                    uri:
                                                        'https://github.com/TCC-Andy/mobile-andy/blob/master/assets/imgs/1barbearia.png?raw=true',
                                                }}
                                            />
                                            <Text style={styles.texto}>Barbearia</Text>
                                        </TouchableOpacity >
                                    </Animatable.View>
                                    <Animatable.View
                                        animation="zoomInDown" duration={3000} style={styles.icon2}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps', { categoria: 'salaoBeleza' })}>
                                            <Avatar
                                                size="xlarge" rounded
                                                source={{
                                                    uri:
                                                        'https://github.com/TCC-Andy/mobile-andy/blob/master/assets/imgs/1salao.png?raw=true',
                                                }}
                                            />
                                            <Text style={styles.texto}>Salão</Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                </View>
                                <View style={styles.row2}>
                                    <Animatable.View
                                        animation="zoomInDown" duration={3000} style={styles.icon3}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps', { categoria: 'mecanica' })}>
                                            <Avatar
                                                size="xlarge" rounded
                                                source={{
                                                    uri:
                                                        'https://github.com/TCC-Andy/mobile-andy/blob/master/assets/imgs/1mecanico.png?raw=true',
                                                }}
                                            />
                                            <Text style={styles.texto}>Mecânica</Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                    <Animatable.View
                                        animation="zoomInDown" duration={3000} style={styles.icon4}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps', { categoria: 'lavaCar' })}>
                                            <Avatar
                                                size="xlarge" rounded
                                                source={{
                                                    uri:
                                                        'https://github.com/TCC-Andy/mobile-andy/blob/master/assets/imgs/1lava_car.png?raw=true',
                                                }}
                                            />
                                            <Text style={styles.texto}>Lava Car</Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>


        )
    }
}



const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: Dimensions.get('window').height,
    },
    containerPricipal: {
        backgroundColor: 'rgba(0,0,0, 0.1)',
        width: '100%',
        height: Dimensions.get('window').height,
    },
    contentContainer: {
        
        height: Dimensions.get('window').height - 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1
    },
    corpo: {
        flex: 1,
    },
    titleBar: {
        flex: 1,
    },
    title: {
        color: 'black',
        fontSize: 20,
        marginLeft: 20,
    },
    texto: {
        fontSize: 18,
        textAlign:"center"

    },
    categoria:{
        fontSize: 23,
        left:20,
       // color: 'white'

    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: Platform.OS === 'ios' ? 40 : 10 // configurancao dependendo da plaforma
    },
    viewSearch: {
        height: 35,
        width: Dimensions.get('window').width - 70,
        justifyContent: 'center',
        right: -10,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 0.2)',
    },
    icon1: {
        flex: 1,
        //flexDirection: 'row',
      //  backgroundColor: 'white',
        alignItems: 'flex-end',
        justifyContent: 'center',
        
    },
    icon2: {
        flex: 1,
        flexDirection: 'row',
       // backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon3: {
        flex: 1,
        flexDirection: 'row',
       // backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon4: {
        flex: 1,
        flexDirection: 'row',
       // backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        //  marginRight: 10,
    },
    row1: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    row2: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'rgba(0,0,0, 0.5)',

    },


});