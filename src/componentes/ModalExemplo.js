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
import ListagemAcordion from '../componentes/listagemAcordionAgenda';
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
        services: this.props.services,
        activeSections: [],
        listar: false,
        date: new Date(),
        opemTimes: false,
        interruptor: false
    }

    buscaServicos = async () => {

        try {
            await storeData('data', moment(this.state.date).format('YYYY/MM/DD'))
            let response = await api.get(`/showCompanyServices/${this.props.id_conpanie}`)

            if (response.data.mensagem === undefined) {

                await this.setState({ services: response.data.servicos })
                await this.setState({ listar: true })
                await this.setState({ interruptor: !this.state.interruptor })
                
            } else {

                 showNotification(response.data.mensagem);
            }
           
        } catch (e) {
            console.log(e)
            showError('Falha na conexão')
            this.setState({ activIndicador: false })
        }
    }

    handleDateAndroidChanged = async () => {
        DatePickerAndroid.open({
            date: this.state.date
        }).then(e => {
            if (e.action !== DatePickerAndroid.dismissedAction) {
                const momentDate = moment(this.state.date)
                momentDate.date(e.day)
                momentDate.month(e.month)
                momentDate.year(e.year)
                this.setState({ date: momentDate.toDate() })
                this.buscaServicos()
               
                 storeData('data',moment(momentDate.toDate()).format('YYYY/MM/DD'))
            }
        })
    }
    
     render() {
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
                                {!this.state.interruptor && this.state.listar && 
                                    <ListagemAcordion services={this.state.services} />
                                }
                                {this.state.interruptor && this.state.listar &&
                                    <ListagemAcordion services={this.state.services} />
                                }
                                {!this.state.listar &&                                 
                                   <ListagemAcordion services={this.props.services} />                                    
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
        backgroundColor: 'rgba(175,238,238, 0.4)',
        flex: 15,
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
        borderRadius: 3,
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
    },
    rowAgendar: {
        flexDirection: "row"
    },
})
