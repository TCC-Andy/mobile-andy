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


export default class ListagemAcordion extends Component {
    state = {
        activIndicador: false,
        services: [],
        activeSections: [],
        opemTimes: false,
    }

    setSections = sections => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    renderHeader = (section, _, isActive) => {
        
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
                        <Text style={styles.headerText}>{section.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} R$ </Text>
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
        return (
            <ListagemAgenda id_conpanie={section.idEmpresa} id_service={section._id} tempo={section.tempo} />
        )
    }

    render() {
        const { activeSections } = this.state;
        return (

            <View>
                <Accordion
                    activeSections={activeSections}
                    sections={this.props.services}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={false}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                    duration={500}
                    onChange={this.setSections}
                />
            </View>

        );
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
