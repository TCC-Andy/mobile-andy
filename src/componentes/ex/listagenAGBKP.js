import React, { Component } from 'react'
import {
    Platform,
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    FlatList,
    SectionList,
    Alert,
    ScrollView,
    Switch,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../service/api';
import { Card } from "react-native-elements";
import ActivIndicador from './activIndicador'
import { showError, showSuccess, showNotification } from '../utils/alertsUser'
import * as Animatable from 'react-native-animatable';
import { color } from 'react-native-reanimated';
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-BR')


export default class listagemAgenda extends Component {
    state = {
        id_conpanie: this.props.id_conpanie,
        id_service: this.props.id_service,
        id_cliente: null,
        dataAgenda: '00/00/0000',
        tempo: this.props.tempo,
        activIndicador: false,
        agenda: [],
        erroBusca: false,
        mensageErro: '',
        places: []
    }

    delay = async (ms) => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }

      async componentDidMount() {

        let dataGet = await AsyncStorage.getItem('data');
        try {
            console.log("Doncce");
            await Promise.all([
                this.buscaAgenda(dataGet)
            ])
        } catch (e) {
           console.log(e)
        }
    }

    buscaAgenda = async (datanova) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let agenda = new Array();
                const data = {
                    idEmpresa: '5ecab500563c112a70493769',
                    dataAgenda: '2020/05/26',
                    idServico: '5ecab7feb7b5ec4e00e7c098',
                    tempoServico: '20'
                }
                api.post('/showDataSchedule', data).then((response) => {
                    if (response.data.agenda.lengh != 0) {
                        response.data.agenda.forEach(data => {
                            agenda.push(data);
                        });
                        this.setState({ agenda: agenda })
                        this.setState({ erroBusca: !this.state.erroBusca })
                    } else {
                        this.setState({ erroBusca: false })
                        this.setState({ mensageErro: 'Nao foi possivel' })
                    }
                    return agenda
                }).catch((error) => {
                    console.log(error)
                });
                ; resolve();
            });
        });
    }


    _retrieData = async () => {
        try {
            const userGet = await AsyncStorage.getItem('user');
            const dataGet = await AsyncStorage.getItem('data');
            if (userGet !== null && data !== null) {
                // Converte este json para objeto
                //var user = JSON.parse(userGet);
                var user = JSON.parse(userGet)
                var data = JSON.parse(dataGet)

                var id_cliente = user._id
                this.setState({ id_cliente, data })
                console.log('---------gggggggggggggggggggg-sssssssss----------------------------------------------------------------------')


                console.log('id cliente ' + this.state.id_cliente + ' data ' + this.state.data)
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    agendarHorario = async (horario) => {
        try {
            showSuccess('Horario ' + horario + ' hrs, reservado com sucesso!')

        } catch (error) {
            console.log(error.message);
        }

    };


    horariosDisponivel(horario) {
        console.log('horarioooo ============', horario)
        return (
            <TouchableOpacity style={styles.viewHorarios} onPress={() => this.agendarHorario(horario)} >
                <View style={styles.horarios} >
                    <Text>
                        {horario.inicioServico}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        console.log('data ' + this.state.data)
        console.log('agendaa ->>>>>>' + this.state.agenda)
        console.log('--1111111111111111111111111111111111------------------------------------------------------------------------')

        return (

            <View>
                <ActivIndicador animating={this.state.activIndicador} />
                {this.state.erroBusca &&
                    <View>
                        {
                            this.state.agenda.map(agenda => (
                                <View style={styles.container}>
                                    <Text style={styles.title}>
                                        Funcionário {agenda.nome}
                                        {console.log('funiocooooonari' + agenda.nome)}
                                    </Text>
                                    <ScrollView horizontal={true}>
                                        {agenda.horariosDisponiveis.map(horario => this.horariosDisponivel(horario))}
                                    </ScrollView>
                                </View>
                            ))
                        }
                    </View>
                }
                {

                    console.log('agenda -->' + Object.values(Object.values(this.state.agenda)))

                }

                <Text>oooGiii</Text>
            </View>

        );




    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(220,220,220,1)',
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



/**
 * 
 * 
 * _retrieData = async () => {
        try {
            const userGet = await AsyncStorage.getItem('user');
            const dataGet = await AsyncStorage.getItem('data');
            if (userGet !== null && data !== null) {
                var user = JSON.parse(userGet)
                var data = JSON.parse(dataGet)

                var id_cliente = user._id
                this.setState({ id_cliente, data })
                console.log('---------gggggggggggggggggggg-sssssssss----------------------------------------------------------------------')


                console.log('id cliente ' + this.state.id_cliente + ' data ' + this.state.data)
            }
        } catch (error) {
            console.log(error.message);
        }
    };
 */