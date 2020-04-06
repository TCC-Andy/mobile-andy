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
    Alert
} from 'react-native'
import api from '../service/api';
import { Card } from "react-native-elements";
import ActivIndicador from './activIndicador'
import { showError, showSuccess, showNotification } from '../utils/alertsUser'
import ListItem from '../componentes/listItem';


export default class ModalExemplo extends Component {
    state = {
        activIndicador: false,
        services: this.props.services
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

    render() {

        if (this.state.services != null) {
          //  console.log("----------------------------------------")
          //  console.log("cooppanieee", this.state.services)
          //  console.log("----------------------------------------")
           // console.log("prosppppppp", this.props.services)
        }
       
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


                        <View style={{ marginTop: (Platform.OS) == 'ios' ? 20 : 0 }}>

                            <SectionList

                                sections={[

                                    { title: 'Servicos', data: this.props.services },

                                ]}

                                renderSectionHeader={({ section }) => <Text> {section.nome} </Text>}

                                renderItem={({ item }) => <ListItem service={item} />}

                                keyExtractor={(item, index) => index}

                            />

                        </View>

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