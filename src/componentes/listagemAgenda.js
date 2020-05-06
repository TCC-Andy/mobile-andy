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


export default class listagemAgenda extends Component {
    state = {
        id_conpanie: this.props.id_conpanie,
        id_service: this.props.id_service,
        id_cliente: null,
        data: this.props.data,
    }

    _retrieData = async () => {
        try {
            console.log("_retrieveData")
            const userGet = await AsyncStorage.getItem('user');

            if (userGet !== null) {
                // Converte este json para objeto
                //var user = JSON.parse(userGet);
                console.log("oi _retrieveData", userGet);
                var user = JSON.parse(userGet)
                var id_cliente = user._id
                console.log("iii cjlient ", user._id);
                this.setState({id_cliente})
            }
        } catch (error) {
            console.log(error.message);
        }
        console.log("tchau  _retrieveData")
    };



    showAgenda = async () => {
        console.log("swooo", this.props.id_conpanie)
        this.setState({ activIndicador: !this.state.activIndicador })
        const data = {
            id_conpanie: this.props.id_conpanie,
            id_service: this.props.id_service,
            id_cliente: this.state.id_cliente,
            data: this.props.data,
        }
        await api.get('/showAgenda').then((response) => {
            if (response.data.lengh != 0) {

                let services = new Array();
                response.data.forEach(data => {

                    console.log(data.coordenadas);

                    services.push(data);

                    console.log(services);
                });
                this.setState({ services: services })
                this.setState({ activIndicador: !this.state.activIndicador })

            } else {
                this.setState({ activIndicador: !this.state.activIndicador })
                return showNotification(response.data.menssagem);
            }
        }).catch((error) => {
            showError('Falha na conexão')
            return this.props.navigation.navigate('Maps')
            //  showError('Falha na conexão')
        });
    }
    agendaDisponivel = (data) => {
        <FlatList
            initialScrollIndex
            data={data}
            horizontal
            renderItem={({ item: rowData }) => {

                return (
                    <Text style={styles.horarios}>
                        {rowData.inicio}
                    </Text>

                );
            }}
            keyExtractor={(item, index) => index}
        />
    }


    render() {
        if(this.state.id_cliente == null){
            console.log('id cliente'+this.state.id_cliente)
            this._retrieData()
        }  
        return (
                <View style={styles.container}>
                <Text>TESTE</Text>
                <Text>
                    oiii agenda
                    id compania { this.props.id_conpanie }
                    id cliente { this.state.id_cliente }
                    id services { this.props.id_sevice }
                    id data { this.props.data }
   
                </Text>

                    </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop:20,
    },
    header: {
        flexDirection: "row",
        backgroundColor: '#696969',
    },
    title: {
        flex: 10,
        textAlign: 'center',
        padding: 14,
        fontSize: 17,
        color: '#ffffff',
    },
    close: {
        flex: 1,
        alignItems: 'flex-end',
    },
    body: {
        flex: 5,
        backgroundColor: '#ffffff',
        color: '#FFFFFF',
    },
    button: {
        margin: 20,
        color: '#800000'
    },
    card: {
        height: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 3,
    },
    horarios: {
        backgroundColor: '#87CEEB',
    },
      title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300',
        marginBottom: 20,
      },
      headerList: {
        backgroundColor: '#F5FCFF',
        padding: 10,
      },
      headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
      },
      content: {
        padding: 20,
        backgroundColor: '#fff',
      },
      active: {
        backgroundColor: 'rgba(255,255,255,1)',
      },
      inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
      },
      selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
      },
      activeSelector: {
        fontWeight: 'bold',
      },
      selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
        textAlign: 'center',
      },
      multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
      },
      multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
      },
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