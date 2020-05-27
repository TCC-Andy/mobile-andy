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
        dataAgenda: '00/00/00',
        isActive: this.props.isActive,
        activIndicador: false,
        agenda: [],
        places: []
    }
    async componentDidMount () {

        try {
            console.log('o-----------------------------------------')
            const userGet = await AsyncStorage.getItem('user');
            const dataGet = await AsyncStorage.getItem('data');

            const data = {
                idEmpresa: '5eb3e4212c78cb2fe89d64a5',
                dataAgenda: '28/25/25',
                idServico: 1,
                tempoServico: 40
            }
            const agenda = await api.post('/showDataSchedule', data);
            
            console.log('agendaaaaaa-> ' + agenda)
            this.setState({ agenda: agenda })

        } catch (err) {
            console.log('Erro:', err);
        }






        // async componentDidMount () {
        //  this.setState({ activIndicador: !this.state.activIndicador })

        // const userGet = await AsyncStorage.getItem('user');
        // const dataGet = await AsyncStorage.getItem('data');


        // if (userGet !== null && data !== null ) {
        //     // Converte este json para objeto
        //     //var user = JSON.parse(userGet);
        //     var user = JSON.parse(userGet)
        //     var dataAgenda = JSON.parse(dataGet)

        //     var id_cliente = user._id
        //     this.setState({ id_cliente,dataAgenda })
        //     console.log('--------------------------------------------------------------------------------')
        //     console.log('--------------------------------------------------------------------------------')
        //     console.log('--------------------------------------------------------------------------------')

        //     console.log('id cliente '+this.state.id_cliente +' data '+this.state.data)
        // }


        // const data = {
        //     idEmpresa: '5eb3e4212c78cb2fe89d64a5',
        //     dataAgenda: '28/25/25',
        //     idServico: 1,
        //     tempoServico: 40
        // }

        // console.log('buscaa--------------agenda  ')

        // /*agenda fake */

        // await api.post('/showDataSchedule', data).then((response) => {
        //     if (response.data.lengh != 0) {
        //         console.log('respoooooooseeee dattttttta', response.data)
        //         let agenda = new Array();

        //         agenda = response.data.agenda

        //         this.setState({ agenda: agenda })



        //     } else {
        //         this.setState({ activIndicador: !this.state.activIndicador })
        //         return showNotification(response.data.mensagem);
        //     }
        // }).catch((error) => {
        //     console.log('erooooooooooooooooo', error)
        //     this.setState({ activIndicador: !this.state.activIndicador })
        //     showError('Falha na conexão')
        //     // return this.props.navigation.navigate('Home')
        // });
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
    // horariosAgenda(horario) {

    //     return (
    //         <TouchableOpacity style={styles.viewHorarios} onPress={() => this.agendarHorario(horario)} >
    //             <View style={styles.horarios} >
    //                 <Text>
    //                     {horario}
    //                 </Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

    render() {

        console.log('data ' + this.state.data)
        console.log('agendaa ' + this.state.agenda)
        console.log('--1111111111111111111111111111111111------------------------------------------------------------------------')
        console.log('isactve  ' + this.state.isActive)

        return (

            <View>
                <ActivIndicador animating={this.state.activIndicador} />
                {

                    // this.state.agenda.map(agenda => (
                    //     <View style={styles.container}>
                    //         <Text style={styles.title}>
                    //             Funcionário {agenda.nome}
                    //             {console.log('funiocooooonari'+agenda.nome)}
                    //         </Text>
                    //         <ScrollView horizontal={true}>
                    //             {/* {agenda.horariosDisponiveis.map(horario => this.horariosDisponivel(horario))} */}
                    //         </ScrollView>
                    //     </View>
                    // ))
                }
                {

                    console.log('agenda -->' + this.state.agenda)
              
                }
                <Text>oiiiii</Text>
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

