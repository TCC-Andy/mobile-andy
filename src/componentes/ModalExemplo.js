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
    FlatList
} from 'react-native'
import { Card } from "react-native-elements";


export default class ModalExemplo extends Component {
    state = {
        servicos: [
            {
                nome: 'corte de cabelo',
                descricao: 'Sera cortado seu cabelo com maquina zero :)',
                tempo: '10:00',
                preco: '30:00',
                Agenda: [
                    {
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
            },
            {
                nome: 'corte de barba',
                descricao: 'Sera fazer a barba :)',
                tempo: '20:00',
                preco: '50:00',
                Agenda: [
                    {
                        nomeFuncionario: 'mariana',
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
                            cliente: 'incio',
                            fim: '18:30'
                        },
                        ]
                    }
                ]
            },
            {
                nome: 'corte de cabelo',
                descricao: 'Sera feito bigode :)',
                tempo: '10:00',
                preco: '30:00',
                Agenda: [
                    {
                        nomeFuncionario: 'joas',
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
                            cliente: 'incio',
                            fim: '18:30'
                        },

                        ]
                    },//agenda 1
                    {
                        nomeFuncionario: 'marcio',
                        HorariosOcupados: [{
                            inicio: '0',
                            cliente: 'incio',
                            fim: '08:30'
                        }, {
                            inicio: '09:00',
                            cliente: 'Ricardo',
                            fim: '10:30'
                        }, {
                            inicio: '0',
                            cliente: 'incio',
                            fim: '18:30'
                        },

                        ]
                    }
                ]
            }

        ]
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
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.closeModal}
                animationType='slide'>
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



                        <FlatList
                            initialScrollIndex
                            data={this.state.servicos}
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
                        />



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
*/