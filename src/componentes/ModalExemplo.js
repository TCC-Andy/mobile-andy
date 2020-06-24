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
    DatePickerAndroid,
    RefreshControl,
} from 'react-native'
import api from '../service/api';
import Icon from 'react-native-vector-icons/FontAwesome'
import ActivIndicador from './activIndicador'
import { showError, showSuccess, showNotification, storeData } from '../utils/alertsUser'
import ViewData from '../componentes/viewData';
import ListagemAgenda from '../componentes/listagemAgenda';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
//import for the animation of Collapse and Expand
import Collapsible from 'react-native-collapsible';
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-BR')

export default class ModalExemplo extends Component {
    state = {
        activIndicador: false,
        services: [],
        activeSections: [],
        listar: false,
        date: new Date(),
        opemTimes: false,
    }
    
        

    agendaDisponivel = (id_service) => {
        Alert.alert('oiii vamo', id_service)
    }

    setSections = sections => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    renderHeader = (section, _, isActive) => {
        //Accordion Header view
        // if (isActive) {
        //     console.log('setSelection oio ', section)
        //     this.agendaDisponivel(section._id)
        // }
        return (
            <Animatable.View
                duration={1}
                style={[styles.headerList, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor">
                <View style={styles.headerTitle}>
                    <View style={styles.nome}>
                        <Text style={styles.headerText}>{section.nome} - {section.tempo} min</Text>
                    </View>
                    <View style={styles.preco}>
                        <Text style={styles.headerText}>{section.preco} R$ </Text>
                    </View>
                </View>
                <View>
                    <Text>
                        {section.descricao}
                    </Text>
                </View>

                <View style={styles.btHorarios} >
                    <Text style={styles.horarios}>
                        Horarios Disponiveis
                     </Text>
                    <Text style={styles.icom}>
                        <Icon name="angle-down" color={'#000000'} size={18} style={{ marginLeft: 50 }} />
                    </Text>
                </View>

            </Animatable.View>
        );
    };

    renderContent(section, _, isActive) {

        console.log('testereee ------------------------------------------------------------------------------------------------------------ve ----  =||||||= ' + isActive)

        //if (isActive) {
        return (
            <ListagemAgenda id_conpanie={section.idEmpresa} id_service={section._id} tempo={section.tempo} />
        )
        // } else {
        // }
    }

    listaServicos = async () => {

        try {
           // var _id = await '5ecab500563c112a70493769'
            let response = await api.get(`/showCompanyServices/${this.props.id_conpanie}`)
           // console.log('sernooo----obooojjj-- ', Object.values(Object.values(response.data.servicos)))
            if (response.data.mensagem === undefined) {
                await this.setState({ services: response.data.servicos })
                await this.setState({ listar: true })
            } else {

                // showNotification(response.data.mensagem);
            }
            storeData('data',moment(this.state.date).format('YYYY/MM/D'))
            console.log('dadadaddaddadd'+moment(this.state.date).format('D/MM/YYYY'))
            // this.setState({ activIndicador: !this.state.activIndicador })

        } catch (e) {
            console.log(e)
             showError('Falha na conexão')
            this.setState({ activIndicador: false })
        }
    }

    handleDateAndroidChanged = () => {
        DatePickerAndroid.open({
            date: this.state.date
        }).then(e => {
            if (e.action !== DatePickerAndroid.dismissedAction) {
                const momentDate = moment(this.state.date)
                momentDate.date(e.day)
                momentDate.month(e.month)
                momentDate.year(e.year)
                this.setState({ date: momentDate.toDate() })
                this.setState({ date: momentDate.toDate() })
                this.listaServicos()
             // console.log(moment(this.state.date).format('D/MM/YYYY'))
               // storeData('data',moment(this.state.date).format('YYYY/MM/D'))
            }
        })
    }
    /**refreshControl={
    <RefreshControl
      //refresh control used for the Pull to Refresh
      refreshing={this.state.refreshing}
      onRefresh={this.onRefresh.bind(this)}
    />
  } */


    render() {
       // console.log('inici rensder ------------id--' + this.props.id_conpanie)
        if (!this.state.listar) {
            this.listaServicos()
        }
        const { activeSections } = this.state;
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.closeModal}
                animationType='slide'>
                <ActivIndicador animating={this.state.activIndicador} />
                <TouchableWithoutFeedback onPress={this.props.closeModal}>
                    <View style={styles.backgroundHeader}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Serviços</Text>
                        <TouchableOpacity style={styles.close}
                            onPress={this.props.closeModal} >
                            <Text style={{ right: 10, color: '#ffffff', fontSize: 15 }}>x</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        {/* <ViewData /> */}



                        <View style={styles.card}>
                {/* <Text> {moment(this.state.date).format('DD/MM/YYYY')}</Text> */}
                <View style={styles.rowAgendar}>
                    <View>
                        <TouchableOpacity onPress={this.handleDateAndroidChanged}>
                            <Text style={styles.textDate}>Selecione data para agendamento</Text>
                            <Text style={styles.date}>
                                <Icon name="calendar" color={'#000000'} size={20} style={{ marginLeft: 10 }} /> -
                        {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >


                        <View style={styles.container}>
                            <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
                                <View style={styles.selectors}>

                                </View>
                                {this.state.listar &&
                                console.log('sactvvevselectoon ' + activeSections),
                                    <Accordion
                                        activeSections={activeSections}
                                        sections={this.state.services}
                                        touchableComponent={TouchableOpacity}
                                        expandMultiple={false}
                                        renderHeader={this.renderHeader}
                                        renderContent={this.renderContent}
                                        duration={500}
                                        onChange={this.setSections}
                                    />
                                }
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.closeModal} >
                    <View style={styles.backgroundFooter}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    backgroundHeader: {
        flex: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    backgroundFooter: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    container: {
        flex: 15,
        // height:  Dimensions.get('window').height - 300
        marginTop: 10,
        borderWidth: 5,
        borderRadius: 3,
        borderColor: '#696969'
    },
    header: {
        flexDirection: "row",
        backgroundColor: '#696969',
        height: 40
    },
    title: {
        flex: 10,
        textAlign: 'center',
        marginBottom: 10,
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
    titleList: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300',
        marginBottom: 20,
    },
    headerList: {
        backgroundColor: '#708090',
        padding: 10,
    },
    headerTitle: {
        flexDirection: "row",
    },
    nome: {
        flex: 4
    },
    preco: {
        flex: 1
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: 'rgba(211,211,211,1)',
    },
    active: {
        backgroundColor: 'rgba(128,128,128,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
        borderWidth: 1,
        borderColor: '#000000',
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
    btHorarios: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.7)',
        // marginLeft: 15,
        borderRadius: 3,
        //width: 140,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        height: 30,
        backgroundColor: '#080',
        marginTop: 8,
    },
    horarios: {
        flex: 22,
        textAlign: "center",
        backgroundColor: '#080',
    },
    icom: {
        flex: 1
    },
    textDate: {
    },
    card: {
        alignItems: 'center'
    },
    date: {
        backgroundColor: '#FFFFFF',
        fontSize: 15,
        marginTop: 5,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.7)',
        //textAlign: 'center',
    },
    rowAgendar: {
        flexDirection: "row"
    },
})





/*

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