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
        dataAgenda: '00/00/0000',
        tempo: this.props.tempo,
        activIndicador: true,
        agenda: [],
        mensageErro: '',
        places: []
    }

    delay = async (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    async componentDidMount() {


        try {
            let dataGet = await AsyncStorage.getItem('data');
            // const data = {
            //     idEmpresa: this.props.id_conpanie,
            //     dataAgenda: dataGet,
            //     idServico: this.props.id_conpanie,
            //     tempoServico: parseInt(this.props.tempo)
            // }
            const data = {
                idEmpresa: '5ecab500563c112a70493769',
                dataAgenda: dataGet,
                idServico: '5ecab7feb7b5ec4e00e7c098',
                tempoServico: parseInt(this.props.tempo)
            }
            let response = await api.post('/showDataSchedule', data)
            console.log('console dir ->',response.data)
            if(response.data.mensagem === undefined){
                await this.setState({ agenda: response.data.agenda })
            }else{
                await this.setState({ mensageErro:response.data.mensagem})
            }
            await this.setState({ activIndicador: !this.state.activIndicador })
        } catch (e) {
            console.log(e)
            this.setState({ activIndicador: false })
            this.setState({ mensageErro:' Falha na conexão'})
            showNotification('Falha na conexão');
        }
    }

    alertConfirmacao = (horario,array) =>
    Alert.alert(
      "Confirmação",
      "deseja realmente fazer Agendamendo",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.agendarHorario(horario,array) }
      ],
      { cancelable: false }
    );

    agendarHorario = async (horario,array) => {
        
        showSuccess('Horario ' + horario + ' hrs, reservado com sucesso!')
        this.setState({ activIndicador: !this.state.activIndicador })
            try {
                let user = await AsyncStorage.getItem('user');
                const data = {
                    status:'1',
                    idFuncionario: array.idFuncionario,
                    nomeFuncionario: array.nomeFuncionario,
                    idCliente: user._id,
                    nomeCliente: user.name,
                    dataAgenda: array.dataServico,
                    idServico: array.idServico,
                    inicioServico: horario.inicioServico,
                    fimServico: horario.fimServico,
                }
                let response = await api.post('/createSchedule', data)
                console.log('criar agenda->',response.data)
                if(response.data.mensagem === undefined){
                   // await this.setState({ agenda: response.data.agenda })
                   showSuccess('Agendado com sucesso')
                }else{
                    this.setState({ mensageErro:response.data.mensagem})
                }
                 this.setState({ activIndicador: !this.state.activIndicador })
            } catch (e) {
                console.log(e)
                this.setState({ activIndicador: false })
                this.setState({ mensageErro:' Falha na conexão'})
                showNotification('Falha na conexão');
            }
        
    };

    horariosDisponivel(horario) {
      //  console.log('horarioooo ============', horario)
        return (
            <TouchableOpacity style={styles.viewHorarios} onPress={() => this.alertConfirmacao(horario)} >
                <View style={styles.horarios} >
                    <Text>
                        {horario.inicioServico}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        console.log('agendaa ->>>>>>' + this.state.agenda)

        return (

            <View>
                <ActivIndicador animating={this.state.activIndicador} />
                {this.state.mensageErro !== '' &&
                    <View>
                        {
                     console.log('agenda []true ou false ->> ', (this.state.agenda === [])),
                            this.state.agenda.map(agenda,indice,array => (
                                <View style={styles.container}>
                                    <Text style={styles.title}>
                                        Funcionário {agenda.nome}
                                        {/* {console.log('funiocooooonari' + agenda.nome)} */}
                                    </Text>
                                    <ScrollView horizontal={true}>
                                        {agenda.horariosDisponiveis.map(horario => this.horariosDisponivel(horario,array))}
                                    </ScrollView>
                                </View>
                            ))
                        }
                    </View>
                }
                {

                   // console.log('agenda -->' + Object.values(Object.values(this.state.agenda)))

                }

                <Text>
                    {this.state.mensageErro !== '' &&
                    this.state.mensageErro}
                </Text>
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

/*
{rowData.Agenda.forEach(nomeFuncionario => {

        <Text>{nomeFuncionario}</Text>
        {this.agendaDisponivel(rowData.Agenda[0])}
})}



servicos: [
            {
                nome: 'corte de cabelo',
                descricao: 'Sera cortado seu cabelo com maquina zero :)',
                tempo: '10:00',
                preco: '30:00',
            },
            {
                nome: 'corte de barba',
                descricao: 'Sera fazer a barba :)',
                tempo: '20:00',
                preco: '50:00',
            },
            {
                nome: 'corte de cabelo',
                descricao: 'Sera feito bigode :)',
                tempo: '10:00',
                preco: '30:00',
            }

        ],
        Agenda: [{
            _id: 1,
            nomeFuncionario: 'gustavo',
            HorariosOcupados: [{
                inicio: '0',
                cliente: 'incio',
                fim: '08:30'
            }, {
                inicio: '0',
                cliente: 'Ricardo',
                fim: '08:30'
            }, {
                inicio: '0',
                cliente: 'fim',
                fim: '18:30'
            },
            ]
        }
        ]
*/
   // return (

        //     <View>
        //         {console.log("flast list", this.state.agenda)}
        //         <FlatList
        //             horizontal={false}
        //             data={this.state.agenda}
        //             renderItem={({ item: rowData }) => {

        //                 return (
        //                     <View>
        //                         <Text>
        //                             flast.......
        //                         {rowData.nomeFuncionario}

        //                         </Text>
        //                         {this.agendaDisponivel(rowData.HorariosOcupados)}
        //                     </View>

        //                 );
        //             }}
        //             keyExtractor={(item, index) => index}
        //         />
        //     </View>

        //     // <View style={styles.container}>
        //     //     <Text>TESTE</Text>
        //     //     <Text>
        //     //         oiii agenda
        //     //         id compania {this.props.id_conpanie}
        //     //         id cliente {this.state.id_cliente}
        //     //         id services {this.props.id_sevice}
        //     //         id data {this.props.data}
        //     //         {this.agendaDisponivel()}

        //     //     </Text>

        //     // </View>
        // )

