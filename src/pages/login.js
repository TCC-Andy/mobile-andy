import React, { Component } from 'react'
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    ActivityIndicator
} from 'react-native'
import ActivIndicador from '../componentes/activIndicador'

import axios from 'axios'
//import AsyncStorage from '@react-native-community/async-storage'

import backgroundImage from '../../assets/imgs/login4.jpg'
import AuthInput from '../componentes/textInput'

import api from '../service/api';
import { showError, showSuccess, showNotification } from '../utils/alertsUser'

const initialState = {
    name: 'bruno',
    surname: 'pedroso',
    email: 'bru@pedroso.com',
    password: '123456',
    confirnPassword: '123456',
    stageNew: false
}

export default class Login extends Component {

    state = {
        ...initialState
    }
    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }
    resetPassword = () => {
        showSuccess('Sua senha sera enviada via email');
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
                return showSuccess(response.data.menssagem);
            } else {
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
                showSuccess('User logado');
                return this.props.navigation.navigate('Home')
            } else {
                return showNotification(response.data.menssagem);
            }
        }).catch((error) => {
            showError('Falha na conexão')
            return this.props.navigation.navigate('Home')
            //  showError('Falha na conexão')
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
                        onPress={this.resetPassword}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '80%'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF'
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
        fontSize: 40,
    },
    textResetSenha: {
        width:150,
        alignContent:'center',
        textAlign: "right",
        paddingEnd:10,
        marginTop:10,
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
        width:156,
        marginTop:10,
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
    }
})