import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import api from '../service/api';
import ActivIndicador from '../componentes/activIndicador'
import { showError, showSuccess, showNotification } from '../utils/alertsUser'

export default class Pagina2 extends Component {
    state = {
        mensageErro: '',
        activIndicador: true,
        agenda: []
    }
    async componentDidMount() {
        try {
            let user = await AsyncStorage.getItem('user')
            var idCliente = user._id
            console.log('id clienrtddde  ',user)
            let response = await api.get(`/showClientHistSchedule/${idCliente}`)
            console.log('console ag horas ->', response.data)
            if (response.data.mensagem === undefined) {
                await this.setState({ agenda: response.data.agenda })
            } else {
                await this.setState({ mensageErro: response.data.mensagem })
            }
            await this.setState({ activIndicador: !this.state.activIndicador })
        } catch (e) {
            console.log(e)
            this.setState({ activIndicador: false })
            this.setState({ mensageErro: ' Falha na conexão' })
            showNotification('Falha na conexão');
        }
    }

    render() {
        return (
            <View>
                <ActivIndicador animating={this.state.activIndicador} />
                <Text> pagina 2 test 1  {this.state.mensageErro}</Text>

            </View>
        )
    }
}