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
} from 'react-native'
import api from '../service/api';
import { Card } from "react-native-elements";
import ActivIndicador from './activIndicador'
import { showError, showSuccess, showNotification } from '../utils/alertsUser'
import ListItem from '../componentes/listItem';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
//import for the animation of Collapse and Expand
import Collapsible from 'react-native-collapsible';

const CONTENT = [
    {
        title: 'primeiro',
        content:
            'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).',
    },
    {
        title: 'segundo',
        content:
            'A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.',
    },
    {
        title: 'terceiro',
        content:
            'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
    },
];

//To make the selector (Something like tabs)
const SELECTORS = [
    { title: 'primeiro', value: 0 },
    { title: 'segundo', value: 1 },
    { title: 'terceiro', value: 2 },
    { title: 'Reset all' },
];

export default class ModalExemplo extends Component {
    state = {
        activIndicador: false,
        services: this.props.services,
        //default active selector
        activeSections: [],
        //collapsed condition for the single collapsible
        collapsed: true,
        //multipleSelect is for the Multiple Expand allowed
        //true: You can expand multiple at a time
        //false: One can be expand at a time and other will be closed automatically
        multipleSelect: false,
    }

    showServices = async () => {
        console.log("swooo", this.props.id_conpanies)
        this.setState({ activIndicador: !this.state.activIndicador })
        const data = {
            categoria: this.state.id_conpanies
        }
        await api.get('/showServices').then((response) => {
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

    toggleExpanded = () => {
        //Toggling the state of single Collapsible
        this.setState({ collapsed: !this.state.collapsed });
    };

    setSections = sections => {
        //setting up a active section state
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    renderHeader = (section, _, isActive) => {
        //Accordion Header view
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor">
                <Text style={styles.headerText}>{section.title}</Text>
            </Animatable.View>
        );
    };

    renderContent(section, _, isActive) {
        //Accordion Content view
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor">
                <Animatable.Text
                    animation={isActive ? 'bounceIn' : undefined}
                    style={{ textAlign: 'center' }}>
                    {section.content}
                </Animatable.Text>
            </Animatable.View>
        )
    }

    render() {

        if (this.state.services != null) {
            console.log("----------------------------------------")
            console.log("cooppanieee", this.state.services)
            //  console.log("----------------------------------------")
            // console.log("prosppppppp", this.props.services)
        }
        const { multipleSelect, activeSections } = this.state;
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


                        <View style={styles.container}>
                            <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
                              
                                {/*Code for Single Collapsible Start*/}
                                <TouchableOpacity onPress={this.toggleExpanded}>
                                    <View style={styles.headerList}>
                                        <Text style={styles.headerText}>simples dobravel Collapsible</Text>
                                        {/*Heading of Single Collapsible*/}
                                    </View>
                                </TouchableOpacity>
                                {/*Content of Single Collapsible*/}
                                <Collapsible collapsed={this.state.collapsed} align="center">
                                    <View style={styles.content}>
                                        <Text style={{ textAlign: 'center' }}>
                                            Tessa é a parte dobravel
                                             </Text>
                                    </View>
                                </Collapsible>
                                {/*Code for Single Collapsible Ends*/}

                                <View style={{ backgroundColor: '#000', height: 1, marginTop: 10 }} />
                                <View style={styles.multipleToggle}>
                                    <Text style={styles.multipleToggle__title}>
                                       Switch liga e dseliga collapsed aberta?
            </Text>
                                    <Switch
                                        value={multipleSelect}
                                        onValueChange={multipleSelect =>
                                            this.setState({ multipleSelect })
                                        }
                                    />
                                </View>
                                <Text style={styles.selectTitle}>
                                Selecione abaixo a opção para expandir
          </Text>

                                {/*Code for Selector starts here*/}
                                <View style={styles.selectors}>
                                    {SELECTORS.map(selector => (
                                        <TouchableOpacity
                                            key={selector.title}
                                            onPress={() => this.setSections([selector.value])}
                                        //on Press of any selector sending the selector value to
                                        // setSections function which will expand the Accordion accordingly
                                        >
                                            <View style={styles.selector}>
                                                <Text
                                                    style={
                                                        activeSections.includes(selector.value) &&
                                                        styles.activeSelector
                                                    }>
                                                    {selector.title}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                {/*Code for Selector ends here*/}

                                {/*Code for Accordion/Expandable List starts here*/}
                                <Accordion
                                    activeSections={activeSections}
                                    //for any default active section
                                    sections={CONTENT}
                                    //title and content of accordion
                                    touchableComponent={TouchableOpacity}
                                    //which type of touchable component you want
                                    //It can be the following Touchables
                                    //TouchableHighlight, TouchableNativeFeedback
                                    //TouchableOpacity , TouchableWithoutFeedback
                                    expandMultiple={multipleSelect}
                                    //Do you want to expand mutiple at a time or single at a time
                                    renderHeader={this.renderHeader}
                                    //Header Component(View) to render
                                    renderContent={this.renderContent}
                                    //Content Component(View) to render
                                    duration={400}
                                    //Duration for Collapse and expand
                                    onChange={this.setSections}
                                //setting the state of active sections
                                />
                                {/*Code for Accordion/Expandable List ends here*/}
                            </ScrollView>
                        </View>

                        {/* <View style={{ marginTop: (Platform.OS) == 'ios' ? 20 : 0 }}>

                            <SectionList

                                sections={[

                                    { title: 'Servicos', data: this.props.services },

                                ]}

                                renderSectionHeader={({ section }) => <Text> {section.nome} </Text>}

                                renderItem={({ item }) => <ListItem service={item} />}

                                keyExtractor={(item, index) => index}

                            />

                        </View> */}

                        {/* <FlatList
                        initialScrollIndex
                        data={this.props.services}
                        renderItem={({ item: rowData }) => {

                            return (
                                <Card containerStyle={styles.card}>
                                    <View>

                                        <Text>
                                            Serviço: {rowData.nome}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text>
                                            DESCRIÇÃO
                                            </Text>
                                        <Text>
                                            {rowData.descricao}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text>
                                            Preço: {rowData.preco} R$ - Duração: {rowData.tempo} minutos
                                            </Text>
                                        <View>
                                            <Text>
                                                Horarios Disponiveis
                                            </Text>
                                            <Text>
                                                Funcionario :Joao
                                                </Text>
                                            <Text>
                                                -       10:00  10:30  11:00  12:00  13:00
                                                </Text>
                                            <Text>
                                                Funcionario : Jose Maria
                                                </Text>
                                            <Text>
                                                -      10:00  10:30  12:00  17:00
                                                </Text>
                                        </View>

                                    </View>
                                </Card>

                            );
                        }}
                        keyExtractor={(item, index) => index}
                    /> */}



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
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    backgroundFooter: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    container: {
        flex: 7,
        // height:  Dimensions.get('window').height - 300
        borderWidth: 5,
        borderRadius: 10,
        borderColor: '#696969'
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