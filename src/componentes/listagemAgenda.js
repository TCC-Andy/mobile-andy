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


export default class listagemAgenda extends Component {
    state = {
        id_conpanie: this.props.id_conpanie,
        id_service: this.props.id_service,
        id_cliente: null,
        data: this.props.data,
        isActive: this.props.isActive,
        activIndicador: false,
        agenda: [],
        places: []
    }

    async componentDidMount() {
        this.setState({ activIndicador: !this.state.activIndicador })
        this._retrieData()
        const data = {
            categoria: 'cabelereiro'
        }

        /*agenda fake */
        let agenda = [{
            _id: 1,
            nomeFuncionario: 'gustavo',
            HorariosDisponivel: ['9:00', '9:10', '9:20', '9:30', '9:40', '10:00', '10:00', '10:30', '11:00', '17:00'],
        }, {
            _id: 2,
            nomeFuncionario: 'viro',
            HorariosDisponivel: ['11:00', '13:00', '14:30', '15:30', '17:30', '18:00', '19:00', '19:30'],
        }, {
            _id: 3,
            nomeFuncionario: 'maria',
            HorariosDisponivel: ['8:00', '9:00', '10:50', '11:00', '12:40', '13:10', '14:50', '15:20', '18:40', '18:00']
        }]

        this.setState({ agenda: agenda })
        console.log('buscaaaa ---------- agenda  ')

        /*agenda fake */

        await api.get('/showCompanies', data).then((response) => {
            if (response.data.lengh != 0) {

                let places = new Array();
                response.data.forEach(data => {

                    places.push(data);
                });
                this.setState({ places: places })
                this.setState({ activIndicador: !this.state.activIndicador })


            } else {
                this.setState({ activIndicador: !this.state.activIndicador })
                return showNotification(response.data.menssagem);
            }
        }).catch((error) => {
            showError('Falha na conexão')
            // return this.props.navigation.navigate('Home')
        });
    }


    _retrieData = async () => {
        try {
            const userGet = await AsyncStorage.getItem('user');

            if (userGet !== null) {
                // Converte este json para objeto
                //var user = JSON.parse(userGet);
                var user = JSON.parse(userGet)
                var id_cliente = user._id
                this.setState({ id_cliente })

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
        return (
            <TouchableOpacity style={styles.viewHorarios} onPress={() => this.agendarHorario(horario)} >
                <View style={styles.horarios} >
                    <Text>
                        {horario}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    horariosAgenda(horario) {
        return (
            <TouchableOpacity style={styles.viewHorarios} onPress={() => this.agendarHorario(horario)} >
                <View style={styles.horarios} >
                    <Text>
                        {horario}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        console.log('agenda' + this.state.isActive, this.state.agenda)
        console.log('places  '+ this.state.isActive,this.state.places)

        return (
            <View>
                <ActivIndicador animating={this.state.activIndicador} />
                {
                    this.state.agenda.map(agenda => (
                        <View style={styles.container}>
                            <Text style={styles.title}>
                                Funcionário {agenda.nomeFuncionario}
                            </Text>
                            <ScrollView horizontal={true}>
                                {agenda.HorariosDisponivel.map(horario => this.horariosDisponivel(horario))}
                            </ScrollView>
                        </View>
                    ))
                }
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

