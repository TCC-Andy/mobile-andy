import React, { Component } from 'react'
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    AsyncStorage,
    Dimensions,
    Alert
} from 'react-native'
import ActivIndicador from '../componentes/activIndicador'
import axios from 'axios'
//import AsyncStorage from '@react-native-community/async-storage'

import backgroundImage from '../../assets/imgs/login4.jpg'//LOGIN4
import AuthInput from '../componentes/textInput'

import api from '../service/api';
import { showError, showSuccess, showNotification } from '../utils/alertsUser'
import { color } from 'react-native-reanimated'

const initialState = {
    name: 'bruno',
    surname: 'pedroso',
    email: 'bruno.1301817@fapi-pinhais.edu.br',
    password: '123456',
    confirnPassword: '123456',
    stageNew: false,
    activIndicador: false,
    opemResetPass: false,
}

export default class Login extends Component {

    state = {
        ...initialState
    }
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('nome', this.state.nome);
            console.log( this.state.nome);
        } catch (error) {
            showError('Falha na conexão')
        }
    }
    _retrieveData = async () => {
        try {
            const user = await AsyncStorage.getItem('nome');
            if (user !== null) {
                console.log(user);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.setState({ activIndicador: !this.state.activIndicador })
            this.signup()
        } else {
            this.setState({ activIndicador: !this.state.activIndicador })
            this.signin()
        }
    }
    resetPassword = async () => {
        this.setState({ opemResetPass: !this.state.opemResetPass })
        this.setState({ activIndicador: !this.state.activIndicador })
        const data = {
            email: this.state.email,

        };
        await api.post('/sendPassReset', data).then((response) => {
            if (response.data.status === 200) {
                this.setState({ activIndicador: !this.state.activIndicador })
                return showSuccess(response.data.menssagem);
            } else {
                this.setState({ activIndicador: !this.state.activIndicador })
                return showNotification(response.data.menssagem);
            }
        }).catch((error) => {
            showError('Falha na conexão')
        });
    }

    signup = async () => {
        const data = {
            nome: this.state.name,
            sobrenome: this.state.surname,
            email: this.state.email,
            senha: this.state.password,
            status: 1
        };
        await api.post('/createUser', data).then((response) => {
            if (response.data.status === 200) {
                this.setState({ stageNew: !this.state.stageNew })
                this.setState({ activIndicador: !this.state.activIndicador })
                return showSuccess(response.data.menssagem);
            } else {
                this.setState({ activIndicador: !this.state.activIndicador })
                return showNotification(response.data.menssagem);
            }
        }).catch((error) => {
            showError('Falha na conexão')
        });
    }

    signin = async () => {
        const data = {
            email: this.state.email,
            senha: this.state.password,
        }
        await api.post('/authenticateUser', data).then((response) => {
            if (response.data.status === 200) {
                this._storeData
                this.setState({ activIndicador: !this.state.activIndicador })
                return this.props.navigation.navigate('Home')
            } else {
                return showNotification(response.data.menssagem);
            }
        }).catch((error) => {
            showError('Falha na conexão')
        });
    }
    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.email && this.state.email.includes('.'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.confirnPassword)
        }

        const validForm = validations.reduce((t, a) => t && a)

        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Modal transparent={true} visible={this.state.opemResetPass}
                    animationType='slide' >
                    <TouchableWithoutFeedback onPress={() => this.setState({ opemResetPass: !this.state.opemResetPass })}>
                        <View style={styles.modalHeader} ></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.modalContainer}>
                        <View style={styles.resetPass}>
                            <TouchableOpacity onPress={() => this.setState({ opemResetPass: !this.state.opemResetPass })}
                                style={styles.closeModal}  >
                                <Text style={{ color: '#FFFFFF', fontSize: 20 }} >
                                    x
                            </Text>
                            </TouchableOpacity>
                            <Text style={{ color: '#FFFFFF', fontSize: 20, marginBottom: 35 }}>
                                Digite seu seu e-mail</Text>
                            <AuthInput icon='at' placeholder='E-mail'
                                value={this.state.email}
                                style={styles.input}
                                onChangeText={email => this.setState({ email })} />
                            <TouchableOpacity onPress={this.resetPassword} >
                                <View style={styles.btResetPass}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 18, marginTop: 5 }}>
                                        Enviar
                            </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.setState({ opemResetPass: !this.state.opemResetPass })}>
                        <View style={styles.modalFooter} ></View>
                    </TouchableWithoutFeedback>
                </Modal>
                <ActivIndicador animating={this.state.activIndicador} />
                <Text style={styles.title}>Andy</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                        <AuthInput icon='user' placeholder='Nome'
                            value={this.state.name}
                            style={styles.input}
                            onChangeText={name => this.setState({ name })} />
                    }
                    {this.state.stageNew &&
                        <AuthInput icon='user' placeholder='Sobrenome'
                            value={this.state.surname}
                            style={styles.input}
                            onChangeText={surname => this.setState({ surname })} />
                    }
                    <AuthInput icon='at' placeholder='E-mail'
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={email => this.setState({ email })} />
                    <AuthInput icon='lock' placeholder='Senha'
                        value={this.state.password}
                        style={styles.input} secureTextEntry={true}
                        onChangeText={password => this.setState({ password })} />
                    {this.state.stageNew &&
                        <AuthInput icon='asterisk'
                            placeholder='Confirmação de Senha'
                            value={this.state.confirnPassword}
                            style={styles.input} secureTextEntry={true}
                            onChangeText={confirnPassword => this.setState({ confirnPassword })} />
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}
                        disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                            <Text style={styles.textBotton}>
                                {this.state.stageNew ? 'Registrarr' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchResetSenha}
                        onPress={() => this.setState({ opemResetPass: !this.state.opemResetPass })}>
                        {!this.state.stageNew &&
                            <Text style={styles.textResetSenha}>
                                Recuperar Senha ?
                    </Text>
                        }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 15 }}
                    onPress={() => this.setState({ stageNew: !this.state.stageNew })} >
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                    </Text>

                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#8B0000',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        fontSize: 60,
        marginBottom: 10
    },
    subtitle: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0, 0.7)',
        padding: 20,
        width: '80%'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFfffF'
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    textBotton: {
        color: '#FFF',
        fontSize: 20,
    },
    textResetSenha: {
        width: 150,
        alignContent: 'center',
        textAlign: "right",
        paddingEnd: 10,
        marginTop: 10,
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',

    },
    textResetSenha: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    touchResetSenha: {
        width: 156,
        marginTop: 10,
    },
    buttonText: {
        padding: 5,
        textAlign: "center",
        color: '#FFF',
        fontSize: 20,
        backgroundColor: 'rgba(128,128,128, 0.9)',
        alignContent: 'center',
        borderColor: '#000000',
        color: '#FFFFFF',
        borderWidth: 2
    },
    btResetPass: {
        alignContent: "center",
        width: 150,
        height: 40,
        color: '#ffffff',
        backgroundColor: '#080',
        marginTop: 40,
        alignItems: 'center',
        borderRadius: 7
    },
    resetPass: {
        backgroundColor: 'rgba(105,105,105, 0.9)',
        width: Dimensions.get('window').width - 40,
        marginLeft: 20,
        paddingBottom: 65,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
        borderRadius: 7,
        height: 250,
        padding: 15,

    },
    modalHeader: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    modalFooter: {
        flex: 2,
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    modalContainer: {
        flex: 3,
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    closeModal: {
        width: 10,
        marginLeft: Dimensions.get('window').width / 2 + 110,
    }
})