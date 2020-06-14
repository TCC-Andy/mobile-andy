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
import backgroundImage from '../../assets/imgs/login4.jpg'
import AuthInput from '../componentes/textInput'
import api from '../service/api';
import { showError, showSuccess, showNotification } from '../utils/alertsUser'

export default class Perfil extends Component {

    state = {
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
            console.log('id clientddde  ', userParse)
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

    signup = async () => {
        this.setState({ activIndicador: !this.state.activIndicador })
        const data = {
            nome: this.state.name,
            sobrenome: this.state.surname,
            email: this.state.email,
            senha: this.state.password,
            status: 1
        };
        // console.log('id client ',this.state.idCliente)

        await api.put(`/updateUser/${this.state.idCliente}`, data).then((response) => {
            //console.log('responseee '+response.data.email)
            if (response.data.email === this.state.email) {

                this.setState({ activIndicador: !this.state.activIndicador })
                return showSuccess('Atualizado com sucesso');
                //return showSuccess(response.data.menssagem);
            } else {
                this.setState({ activIndicador: !this.state.activIndicador })
                return showSuccess('Não foi possivel atualizar');
                //return showNotification(response.data.menssagem);
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

            <ScrollView>
                <View style={styles.formContainer}>
                    <StatusBar barStyle="dark-content" />
                    <ActivIndicador animating={this.state.activIndicador} />
                    <Text style={styles.subtitle}>
                        Atualizar seus dados
                        </Text>

                    <AuthInput icon='user' placeholder='Nome'
                        value={this.state.name}
                        style={styles.input}
                        onChangeText={name => this.setState({ name })} />


                    <AuthInput icon='user' placeholder='Sobrenome'
                        value={this.state.surname}
                        style={styles.input}
                        onChangeText={surname => this.setState({ surname })} />

                    <AuthInput icon='at' placeholder='E-mail' keyboardType='email-address'
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={email => this.setState({ email })} />
                    <AuthInput icon='lock' placeholder='Senha'
                        value={this.state.password}
                        style={styles.input} secureTextEntry={true}
                        onChangeText={password => this.setState({ password })} />

                    <AuthInput icon='asterisk'
                        placeholder='Confirmação de Senha'
                        value={this.state.confirnPassword}
                        style={styles.input} secureTextEntry={true}
                        onChangeText={confirnPassword => this.setState({ confirnPassword })} />

                    <View>
                        <TouchableOpacity onPress={this.signup}
                            disabled={!validForm}>
                            <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                                <Text style={styles.textBotton}>
                                    Atualizar
                                    </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View duration={1800}>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    title: {
        color: '#8B0000',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        fontSize: 60,
        marginBottom: 20,
    },
    subtitle: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 50
    },
    formContainer: {
        paddingTop: '5%',
        backgroundColor: 'rgba(0,0,0, 0.8)',
        padding: 50,
        width: '100%',
        height: Dimensions.get('window').height,

    },
    input: {
        marginTop: 15,
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