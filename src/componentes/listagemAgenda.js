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
                tempoServico: this.props.tempo
            }
            console.log('console di=====================dddddddd ->', data)
           // console.log(data)
            // const data = {
            //     idEmpresa: '5ecab500563c112a70493769',
            //     dataAgenda: dataGet,
            //     idServico: '5ecab7feb7b5ec4e00e7c098',
            //     tempoServico: parseInt(this.props.tempo)
            // }
            let response = await api.post('/showDataSchedule', data)
          //  console.log('console dir ->', response.data)
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
        //console.log('arayyy ------------------- '+Object.values(Object.values(array)))
        //showSuccess('Horario ' + array + ' hrs, reservado com sucesso!')
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
            if (response.data.mensagem === undefined) {
                // await this.setState({ agenda: response.data.agenda })
                showSuccess('Agendado com sucesso')
            } else {
                this.setState({ mensageErro: response.data.mensagem })
            }
            this.setState({ activIndicador: !this.state.activIndicador })
        } catch (e) {
            console.log(e)
            this.setState({ activIndicador: false })
            this.setState({ mensageErro: ' Falha na conexão' })
            showNotification('Falha na conexão');
        }

    };

    horariosDisponivel(horario, array) {
        //  console.log('horarioooo ============', horario)
        return (
            <TouchableOpacity style={styles.viewHorarios} onPress={() => this.alertConfirmacao(horario, array)} >
                <View style={styles.horarios} >
                {console.log(' data'+this.state.data.toString()+' '+ array.dataServico.toString())}
                    {console.log(' data'+(this.state.data.toString() === array.dataServico.toString()))}
                    {console.log((this.state.horario.toString() < horario.inicioServico.toString()))}
                    <Text>
                        {horario.inicioServico}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
       console.log('---------horasas-------------------',this.state.horario)
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

                   // console.log('agenda -->' + Object.values(Object.values(this.state.agenda)))

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

