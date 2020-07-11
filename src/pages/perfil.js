import React, { Component } from 'react'
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Dimensions,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import ActivIndicador from '../componentes/activIndicador'
import backgroundImage from '../../assets/imgs/login15.jpg'
import AuthInput from '../componentes/textInput'
import api from '../service/api';
import { showError, showSuccess, showNotification } from '../utils/alertsUser'

export default class Perfil extends Component {

    state = {
        flag: false,
        idCliente: null,
        name: '',
        surname: '',
        email: '',
        password: '123456',
        confirnPassword: '123456',
        activIndicador: false,
    }

    async componentDidMount() {
        let agenda = new Array();
        try {
            let user = await AsyncStorage.getItem('user')
            var userParse = JSON.parse(user);
            var idCliente = userParse._id
            await this.setState({ idCliente: userParse._id })
            await this.setState({ name: userParse.name })
            await this.setState({ surname: userParse.surname })
            await this.setState({ email: userParse.email })

        } catch (e) {
            console.log(e)
            this.setState({ activIndicador: false })
            showNotification('Falha na conexão');
        }
    }
    _storeData = async (userSet) => {

        try {
            var user = JSON.stringify(userSet);
            await AsyncStorage.setItem('user', user);            
        } catch (error) {
            console.log(error)
            this.setState({ activIndicador: !this.state.activIndicador })
            showError('Falha ao iniciar uma nova sessao')
        }
    }

    signup = async () => {
        this.setState({ activIndicador: !this.state.activIndicador })
        const data = {
            nome: this.state.name,
            sobrenome: this.state.surname,
            email: this.state.email,
            senha: this.state.password,
            status: 1
        };

        await api.put(`/updateUser/${this.state.idCliente}`, data).then((response) => {
            if (response.data.status === 200) {
                this.setState({ activIndicador: !this.state.activIndicador })
                this.setState({ flag: !this.state.flag })
                const user = {
                    _id: response.data.usuario._id,
                    name: response.data.usuario.nome,
                    surname: response.data.usuario.sobrenome,
                    email: response.data.usuario.email,
                }
                this._storeData(user);
                return showSuccess(response.data.mensagem);
            } else {
                this.setState({ activIndicador: !this.state.activIndicador })
                return showNotification(response.data.mensagem);
            }
        }).catch((error) => {
            console.log(error)
            showError('Falha na conexão')
            this.setState({ activIndicador: false })
        });
    }

    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.email && this.state.email.includes('.'))
        validations.push(this.state.password && this.state.password.length >= 6)
        validations.push(this.state.name && this.state.name.trim().length >= 3)
        validations.push(this.state.password === this.state.confirnPassword)
        const validForm = validations.reduce((t, a) => t && a)

        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <ScrollView>
                <View style={styles.viewTitle}>
                            <Text style={styles.subtitle}>
                                Dados do Usuario {this.state.name}
                            </Text>
                        </View>
                    <View style={styles.formContainer}>
                        {/* <StatusBar barStyle="dark-content" /> */}
                        <ActivIndicador animating={this.state.activIndicador} /> 
                        <AuthInput icon='user' placeholder='Nome'
                            value={this.state.name}
                            style={styles.input}
                            onChangeText={name => this.setState({ name })} editable={this.state.flag} />

                        <AuthInput icon='user' placeholder='Sobrenome'
                            value={this.state.surname}
                            style={styles.input}
                            onChangeText={surname => this.setState({ surname })} editable={this.state.flag} />

                        <AuthInput icon='at' placeholder='E-mail' keyboardType='email-address'
                            value={this.state.email}
                            style={styles.input}
                            onChangeText={email => this.setState({ email })} editable={this.state.flag} />
                        <AuthInput icon='lock' placeholder='Senha'
                            value={this.state.password}
                            style={styles.input} secureTextEntry={true}
                            onChangeText={password => this.setState({ password })} editable={this.state.flag} />

                        <AuthInput icon='asterisk'
                            placeholder='Confirmação de Senha'
                            value={this.state.confirnPassword}
                            style={styles.input} secureTextEntry={true}
                            onChangeText={confirnPassword => this.setState({ confirnPassword })} editable={this.state.flag} />

                        <View>
                            {!this.state.flag &&
                                <TouchableOpacity onPress={() => this.setState({ flag: !this.state.flag })}
                                    disabled={!validForm}>
                                    <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                                        <Text style={styles.textBotton}>
                                            Editar
                                            </Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            {this.state.flag &&
                                <TouchableOpacity onPress={this.signup}
                                    disabled={!validForm}>
                                    <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                                        <Text style={styles.textBotton}>
                                            Atualizar
                                            </Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                        <View duration={1800}>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({

    background: {
        width: '100%',
    },
    title: {
        color: '#8B0000',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        fontSize: 60,
        marginBottom: 20,
    },
    subtitle: {
        color: '#000000',
        fontSize: 25,
    },
    viewTitle: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flexDirection: 'row',
        marginHorizontal: 10,
        height: 40,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        right: 10,
        justifyContent: 'center',
    },
    formContainer: {
        paddingTop: '5%',
        backgroundColor: 'rgba(0,0,0, 0.1)',
        padding: 50,
        width: '100%',
        height: Dimensions.get('window').height,
    },
    input: {
        marginTop: 30,
        backgroundColor: '#FFfffF'
    },
    button: {
        left: '25%',
        width: "40%",
        height: 40,
        backgroundColor: '#080',
        marginTop: 25,
        padding: 7,
        alignItems: 'center',
        borderRadius: 3
    },
    textBotton: {
        color: '#FFF',
        fontSize: 20,
    },
})