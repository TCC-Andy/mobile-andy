import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    Alert,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ImageBackground,
} from 'react-native'
import backgroundImage from '../../assets/imgs/login15.jpg'
import { Card } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage';
import api from '../service/api';
import ActivIndicador from '../componentes/activIndicador'
import { showError, showSuccess, showNotification } from '../utils/alertsUser'
import { Avatar, Badge, SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-BR')

export default class Agenda extends Component {
    state = {
        date: new Date(),
        mensageErro: '',
        activIndicador: false,
        agenda: [],
        refreshing: false,
    }
    async componentDidMount() {

        let agenda = new Array();
        await this.setState({ activIndicador: !this.state.activIndicador })
        console.log('aquiiiiiiiii')
        try {
            let user = await AsyncStorage.getItem('user')
            var userParse = JSON.parse(user);
            var idCliente = userParse._id

            const data = {
                idCliente: idCliente,
                dataAgenda: moment(this.state.date).format('YYYY/MM/DD'),
            }
            console.log('data  ', data)
            let response = await api.post('/showClientCurrentSchedule', data)
            console.log('console ag horas ->', response.data)
            console.log('------------------------------------------------>msdg ', response.data.schedule.length)
            if (response.data.schedule.length > 0) {
                agenda = response.data.schedule
                await this.setState({ agenda: agenda })
                await this.setState({ mensageErro: '' })
                console.log(agenda)
            } else {
                await this.setState({ mensageErro: 'Não foi reallizado nenhum agendamento até o momento' })
                //showNotification('Nenhum agendamento até o momento')
            }
            await this.setState({ activIndicador: !this.state.activIndicador })
        } catch (e) {
            console.log(e)
            this.setState({ activIndicador: false })
            this.setState({ mensageErro: ' Falha na conexão' })
            showError('Falha na conexão');
        }
    }

  cancelarAgendamento = (_id) =>
    
        Alert.alert(
            "Confirmação",
            "Deseja realmente Cancelar esse horario",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => this.cancelarHorario(_id) }
            ],
            { cancelable: false }
        );

  cancelarHorario = async (_id) => {

    this.setState({ activIndicador: !this.state.activIndicador })
    try {
        
        let response = await api.get(`/deleteClientSchedule/${_id}`)
        showSuccess(response.data.mensagem);

        this.setState({ activIndicador: !this.state.activIndicador })
        await this.componentDidMount()
    } catch (e) {
        console.log(e)
        showError('Falha na conexão')
        this.setState({ activIndicador: false })
    }
}
    _onRefresh = async () => {
        await this.componentDidMount()
        this.setState({ refreshing: true });
        this.setState({ refreshing: false });
    }

    render() {
        return (
<ImageBackground source={backgroundImage}
                style={styles.background}>
            <View style={styles.containerPricipal}>
                <ActivIndicador animating={this.state.activIndicador} />
                <View style={styles.viewTitle}>
                    <Text style={styles.title}>
                    Horários Agendados
                    </Text>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    scrollEnabled={false}
                    contentContainerStyle={styles.contentContainer}
                >

                    {this.state.mensageErro === '' &&
                        <View>
                            {
                                //console.log('agen lopp', this.state.agenda),
                                this.state.agenda.map(agenda => (
                                    // console.log(agenda),
                                    <Card containerStyle={styles.card}>

                                        <View style={styles.iconFavorito}>
                                            <View style={styles.viewNomeEmpresa}>
                                            <Text style={styles.fontCard}>{agenda.nomeEmpresa}- {agenda.dataAgenda}</Text>
                                            </View>
                                            <View style={styles.viewbuttonFavorito}>
                                                <TouchableOpacity style={styles.buttonFavorito}
                                                    onPress={() => this.cancelarAgendamento(agenda._id)}>
                                                    <Icon name="remove" color={'#FF0000'} size={20} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        
                                        <Text style={styles.fontCard}>{agenda.nomeServico} </Text>
                                        <Text style={styles.fontCard}>Horário: {agenda.inicioServico} min - {agenda.fimServico} min </Text>
                                        <Text style={styles.fontCard}>Funcionário: {agenda.nomeFuncionario} </Text>
                                        <Text style={styles.fontCard}>{agenda.ruaEmpresa} - {agenda.numeroEmpresa} </Text>
                                        <View style={styles.viewCategoria}>
                                            <TouchableOpacity style={styles.localizacao}
                                                onPress={() => this.props.navigation.navigate('Localização', { empresa: agenda })}>
                                                <View style={styles.iconeLocal}>
                                                    <Icon name='map-marker'
                                                        size={25} color='red' />
                                                </View>
                                                <View style={styles.viewTextLocal}>
                                                    <Text style={styles.textLocal}>Localização</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </Card>
                                ))
                            }
                        </View>
                    }
                    {
                        this.state.mensageErro !== '' &&

                        <Card containerStyle={styles.card}>
                            <View style={styles.viewErro}>
                                <Text style={styles.erro}>
                                    {this.state.mensageErro}
                                </Text>
                            </View>
                        </Card>

                    }
                </ScrollView >
            </View>
            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: Dimensions.get('window').height,
    },
    containerPricipal:{
        backgroundColor: 'rgba(0,0,0, 0.1)',
        width: '100%',
        height: Dimensions.get('window').height,
    },
    contentContainer: {
        paddingBottom: 60,
        paddingTop: 10
    },
    container: {
        backgroundColor: 'rgba(220,220,220,1)',
    },
    viewTitle: {
        backgroundColor: 'rgba(0,0,0,0.2)',
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
        // padding: 10,
        // marginTop: 4,
        // margin: 10,
        // height: 185,
        // width: Dimensions.get('window').width - 20,
        borderBottomWidth: 5,
        borderRadius: 5,
        borderColor: '#708090',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    viewNomeEmpresa: {
        flex: 15,
    },
    viewCategoria: {
        width: Dimensions.get('window').width - 200,
    },
    textNomeEmpres: {
        fontSize: 18,
        color: '#000000'
    },
    iconFavorito: {
        width: Dimensions.get('window').width - 40,
        flexDirection: 'row',
    },
    viewbuttonFavorito: {
        flex: 3,
    },
    buttonFavorito: {
        width: 32,
        height: 32,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        alignItems: "center",
        // paddingRight: 5,
        // paddingLeft: 5,
        // left: 5,
        borderRadius: 3,
        justifyContent: 'center'
    },
    localizacao: {
        flexDirection: 'row',
        // padding: 10,
        marginTop: 5,
        marginBottom: 5,
        // margin: 10,
        // height: 20,
        // width: '100%',
        borderWidth: 5,
        borderRadius: 5,
        borderColor: '#708090'
    },
    iconeLocal: {
        left: 10,
        flex: 3
    },
    viewTextLocal: {
        justifyContent: "center",
        flex: 10
    },
    textLocal: {
        fontSize: 18,
        color: '#000000'
    },
    fontCard: {
        fontSize: 18,
        color: '#000000'
    },
    title: {
        fontSize: 25,
        color: '#000000'
    },
    viewErro: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    erro: {
        margin: 10,
        fontSize: 22,
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