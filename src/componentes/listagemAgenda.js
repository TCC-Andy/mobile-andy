import React, { Component } from 'react'
import {
    Platform,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    FlatList,
    SectionList,
    Alert,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../service/api';
import ActivIndicador from './activIndicador'
import { showError, showSuccess, showNotification } from '../utils/alertsUser'
import * as Animatable from 'react-native-animatable';
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-BR')


export default class listagemAgenda extends Component {
    state = {
        id_conpanie: this.props.id_conpanie,
        id_service: this.props.id_service,
        id_cliente: null,
        dataAgenda: '0000/00/00',
        tempo: this.props.tempo,
        activIndicador: true,
        agenda: [],
        mensageErro: '',
        horario: moment().format('LT'),
        data: moment().format("YYYY/MM/DD"),
    }

    delay = async (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    async componentDidMount() {

        try {
            console.log('foi no bancioooooo ------------------------------------')
            let dataGet = await AsyncStorage.getItem('data');
            const data = {
                idEmpresa: this.props.id_conpanie,
                dataAgenda: JSON.parse(dataGet),
                idServico: this.props.id_service,
                tempoServico: this.props.tempo,
                horaAtual: moment().format('LT'), 
                hoje: moment().format("YYYY/MM/DD")
            }
            console.log('console di=====================dddddddd ->', data)
           
            let response = await api.post('/showDataSchedule', data)
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
            showNotification('Falha na conexão buscas agenda');
        }
    }

    alertConfirmacao = (horario, array) =>
    
        Alert.alert(
            "Confirmação",
            "Deseja realmente fazer Agendamendo",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.agendarHorario(horario, array) }
            ],
            { cancelable: false }
        );

    agendarHorario = async (horario, array) => {
        this.setState({ activIndicador: !this.state.activIndicador })
        try {
            let userGet = await AsyncStorage.getItem('user');
            let user = await JSON.parse(userGet)
            const data = await {
                status: '1',
                idFuncionario: array._id,
                nomeFuncionario: array.nome,
                idCliente: user._id,
                nomeCliente: user.name,
                dataAgenda: array.dataServico,
                idServico: array.idServico,
                inicioServico: horario.inicioServico,
                fimServico: horario.fimServico,
            }
            console.log('userrrrrrruse 22222222----------------------------------------------------------------r')
            console.log('dadosss->', data)
            let response = await api.post('/createSchedule', data)
          //  console.log('criar agenda->', response.data)
            if (response.data.status === 200) {
                // await this.setState({ agenda: response.data.agenda })
                showSuccess('Agendado com sucesso')
                this.componentDidMount()
                
            } else {
                this.setState({ mensageErro: response.data.mensagem })
            }
            //this.setState({ activIndicador: !this.state.activIndicador })
        } catch (e) {
            console.log(e)
            this.setState({ activIndicador: false })
            this.setState({ mensageErro: ' Falha na conexão' })
            showNotification('Falha na conexão');
        }

    };

    horariosDisponivel(horario, array) {
        return (
            <TouchableOpacity style={styles.viewHorarios} onPress={() => this.alertConfirmacao(horario, array)} >
                <View style={styles.horarios} >                
                    <Text>
                        {horario.inicioServico}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
       
        return (

            <View>
                <ActivIndicador animating={this.state.activIndicador} />
                {this.state.mensageErro == '' &&
                    <View>
                        {
                            
                            this.state.agenda.map((agen, indice, array) => (
                                <View style={styles.container}>
                                    <Text style={styles.title}>
                                        Funcionário {agen.nome}
                                    </Text>
                                    <ScrollView horizontal={true}>
                                        {agen.horariosDisponiveis.map(horario => this.horariosDisponivel(horario, agen))}
                                    </ScrollView>
                                </View>
                            ))
                        }
                    </View>
                }
                {


                }
                {this.state.mensageErro !== '' &&
                    <View style={styles.containerErro}>
                        <Text style={styles.msgErro}>
                            {this.state.mensageErro}
                        </Text>
                    </View>
                }
            </View>

        );




    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(220,220,220,1)',
    },
    containerErro: {
        backgroundColor: 'rgba(220,220,220,1)',
        height:80
    },
    msgErro: {
        margin: 10,
        marginTop:30,
        fontSize: 15,
    },
    title: {
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

