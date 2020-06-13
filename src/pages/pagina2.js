import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    Alert,
    ScrollView,
} from 'react-native'
import { Card } from "react-native-elements";
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
        let agenda = new Array();
        try {
            let user = await AsyncStorage.getItem('user')
            var userParse = JSON.parse(user);
            var idCliente = userParse._id
            console.log('id clientddde  ', idCliente)
            let response = await api.get(`/showClientHistSchedule/${idCliente}`)
            console.log('console ag horas ->', response.data)
            console.log('------------------------------------------------>msdg ', response.data.mensagem)
            if (response.data.mensagem == undefined) {
                agenda = response.data.schedule
                await this.setState({ agenda: agenda })
                console.log(agenda)
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
                <View style={styles.viewTitle}>
                    <Text style={styles.title}>
                        Horarios Agendados
                    </Text>
                </View>
                <ScrollView>

                    {this.state.mensageErro === '' &&
                        <View>
                            {
                                console.log('agen lopp', this.state.agenda),
                                this.state.agenda.map(agenda => (
                                    console.log(agenda),
                                    <Card containerStyle={styles.card}>
                                        <Text style={styles.fontCard}>Empresa Teste - {agenda.dataAgenda}</Text>
                                        <Text style={styles.fontCard}>Corte masculino </Text>
                                        <Text style={styles.fontCard}>Horario: {agenda.inicioServico} hrs - {agenda.fimServico} hrs </Text>
                                        <Text style={styles.fontCard}>Funcionrio: {agenda.nomeFuncionario} </Text>
                                        <Text style={styles.fontCard}>Rua camilo de lemis 666 </Text>
                                    </Card>
                                ))
                            }
                        </View>
                    }
                    {this.state.mensageErro !== '' &&
                        <View>
                            <Text style={styles.erro}>

                                {this.state.mensageErro}
                Não foi reallizado nenhum agendamento
                </Text>
                        </View>
                    }
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(220,220,220,1)',
    },
    viewTitle: {
        backgroundColor: '#808080',
        flexDirection: 'row',
        marginHorizontal: 10,
        height: 40,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        right: 10,
        justifyContent: 'center',
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        marginTop: 2,
        margin: 10,
        height: 150,
        width: Dimensions.get('window').width - 20,
        borderBottomWidth: 5,
        borderRadius: 5,
        borderColor: '#708090'
    },
    fontCard: {
        fontSize: 18,
        color: '#000000'
    },
    title: {
        fontSize: 25,
        color: '#FFFFFF'
    },
    erro: {
        margin: 10,
        fontSize: 18,
        color: '#000000'
    },
    viewHorarios: {
        paddingTop: 15,
        paddingLeft: 7,
        paddingRight: 7,
        height: 60,

    },
    horarios: {
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 5,
        width: 50,
        fontSize: 30,
        backgroundColor: 'rgba(0,255,0,1)',
    }
})

/*
Agenda: [{
    idServico:1,
    idFuncionario: 1,
    nomeFuncionario: 'gustavo',
    nomeCliente: 'incio',
    idCliente:1,
    inicioServico: '08:00',
    fimServico: '08:30',
    dataAgenda:'10/12/20',
    status:1
},
{
    idServico:1,
    idFuncionario: 1,
    nomeFuncionario: 'vinicius',
    nomeCliente: 'incio',
    idCliente:1,
    inicioServico: '17:00',
    fimServico: '17:10',
    dataAgenda:'05/12/20',
    status:1
},
{
    idServico:1,
    idFuncionario: 1,
    nomeFuncionario: 'drew',
    nomeCliente: 'incio',
    idCliente:1,
    inicioServico: '12:00',
    fimServico: '13:30',
    dataAgenda:'05/11/20',
    status:1
}]
*/