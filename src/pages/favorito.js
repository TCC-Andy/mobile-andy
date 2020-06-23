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
} from 'react-native'
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

export default class Favorito extends Component {
    state = {
        date: new Date(),
        mensageErro: '',
        activIndicador: true,
        favorito: []
    }
    async componentDidMount() {
        let favorito = new Array();
        console.log('aquiiiiiiiii')
        try {
            let user = await AsyncStorage.getItem('user')
            var userParse = JSON.parse(user);
            var idCliente = userParse._id

            
            let response = await api.get(`/showFavorites/${idCliente}`)
            console.log('console ag favor ->', response.data.favoritos)
            console.log('-------------------->respos ', response)
            if (response.data.favoritos.length > 0) {
                favorito = response.data.favoritos
                await this.setState({ favorito: favorito })
                console.log(favorito)
            } else {
                await this.setState({ mensageErro: 'Nenhuma empresa adicionada até o momento' })
                showNotification('Nenhuma empresa adicionada')
            }
             await this.setState({ activIndicador: !this.state.activIndicador })
        } catch (e) {
            console.log(e) 
            this.setState({ activIndicador: false })
            this.setState({ mensageErro: ' Falha na conexão' })
            showError('Falha na conexão');
        }
    }

    render() {
        return (

            <View>
                <ActivIndicador animating={this.state.activIndicador} />
                <View style={styles.viewTitle}>
                    <Text style={styles.title}>
                        Favoritos
                    </Text>
                </View>
                <ScrollView scrollEnabled={true}
                 contentContainerStyle={styles.contentContainer}>

                    {this.state.mensageErro === '' &&
                        <View>
                            {
                                console.log('agen lopp', this.state.favorito),
                                this.state.favorito.map(favorito => (
                                    console.log(favorito),
                                    <Card containerStyle={styles.card}>
                                        <Text style={styles.fontCard}>{favorito.nomeEmpresa}- {favorito.datafavorito}</Text>
                                        <Text style={styles.fontCard}>Categoria: {favorito.categoria} </Text>
                                        <Text style={styles.fontCard}>{favorito.descricao} </Text>
                                        <Text style={styles.fontCard}>{favorito.cidade} - {favorito.bairro} </Text>
                                        <Text style={styles.fontCard}>{favorito.rua} - {favorito.numero} </Text>
                                        <View>
                                            <TouchableOpacity style={styles.localizacao}
                                             onPress={() => this.props.navigation.navigate('Maps Favoritos',{empresa:favorito})}>
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
                    {console.log("msg erroo ", this.state.mensageErro),
                        this.state.mensageErro !== '' &&

                        <Card containerStyle={styles.card}>
                            <View style={styles.viewErro}>
                                <Text style={styles.erro}>
                                    {this.state.mensageErro}
                                </Text>
                            </View>
                        </Card>

                    }
                </ScrollView>
            </View>

        )
    }
}/*

*/

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom:60,
        paddingTop:10
    },
    container: {
        backgroundColor: 'rgba(220,220,220,1)',
    },
    viewTitle: {
        backgroundColor: '#808080',
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
        padding: 10,
        marginTop: 4,
        margin: 10,
        height: 185,
        width: Dimensions.get('window').width - 20,
        borderBottomWidth: 5,
        borderRadius: 5,
        borderColor: '#708090'
    },
    localizacao: {
        flexDirection: 'row',
        // padding: 10,
        marginTop: 5,
        marginBottom:5,
        // margin: 10,
        // height: 20,
        // width: '100%',
        borderWidth: 5,
        borderRadius: 5,
        borderColor: '#708090'
    },
    iconeLocal: {
        left:10,
        flex:3
    },
    viewTextLocal: {
        justifyContent:"center",
        flex:10
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
        color: '#FFFFFF'
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
favorito: [{
    idServico:1,
    idFuncionario: 1,
    nomeFuncionario: 'gustavo',
    nomeCliente: 'incio',
    idCliente:1,
    inicioServico: '08:00',
    fimServico: '08:30',
    datafavorito:'10/12/20',
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
    datafavorito:'05/12/20',
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
    datafavorito:'05/11/20',
    status:1
}]
*/