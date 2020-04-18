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
    DatePickerAndroid
} from 'react-native'
import { Card } from "react-native-elements";
import { Avatar, Badge, SearchBar,Overlay } from 'react-native-elements'
import Padrao from '../estilo/Padrao'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-BR')

export default class ListItem extends Component {
state={
    date:new Date(),
    opemTimes:false
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
        }
    })
}
    render(){
        //console.log(this.props)
        return(
            <Card containerStyle={styles.card}>
            <View>

                <Text>
                    Serviço: {this.props.service.nome}
                </Text>
            </View>
            <View>
                <Text>
                    DESCRIÇÃO
                    </Text>
                <Text>
                    {this.props.service.descricao}
                </Text>
            </View>
            <View>
                <Text>
                    Preço: {this.props.service.preco} R$ - Duração: {this.props.service.tempo} minutos
                    </Text>
                <View>
              
                <TouchableOpacity onPress={this.handleDateAndroidChanged}>
                    <Text style={styles.date}>
                    <Icon name="calendar" color={'#000000'} size={20} style={{marginLeft:10}} /> - 
                        {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btHorarios} 
                 onPress={() => this.setState({ opemTimes: !this.state.opemTimes })}>
                    <Text style={styles.horarios}>
                        Verificar Horarios
                    </Text>
                </TouchableOpacity>

                </View>
                <Modal transparent={true} visible={this.state.opemTimes}
                        animationType='slide' >
                        <TouchableWithoutFeedback onPress={() => this.setState({ opemTimes: !this.state.opemTimes })}>
                            <View style={styles.modalHeader} ></View>
                        </TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalTimes}>
                                <TouchableOpacity onPress={() => this.setState({ opemTimes: !this.state.opemTimes })}
                                    style={styles.closeModal}  >
                                    <Text style={{ color: '#000000', fontSize: 20 }} >
                                        x
                            </Text>
                                </TouchableOpacity>
                                {/* corpo */}
                                 <TouchableOpacity onPress={this.opemTimes} >
                                    
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.setState({ opemTimes: !this.state.opemTimes })}>
                            <View style={styles.modalFooter} ></View>
                        </TouchableWithoutFeedback>
                    </Modal>
            </View>
        </Card>
           
            // <View>
               
            //     <Text>Hello from !
            //         {this.props.service.nome}
            //     </Text>
        
           // </View>  // onChange para alterar o valor quando alterado //
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
    date: {
        backgroundColor:'#FFFFFF',
        fontSize: 15,
        marginTop: 10,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.7)',
        //textAlign: 'center',
    },
    horarios:{
        fontSize: 17,
        textAlign: 'center',
    },
    btHorarios:{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.7)',
        marginLeft: Dimensions.get('window').width /2 - 108,
        borderRadius:3,
        width:140,
        height:30,
        backgroundColor:'#080',
        marginTop: 20,
    },
    modalTimes: {
        backgroundColor: 'rgba(255,255,255, 0.9)',
        width: Dimensions.get('window').width - 40,
        marginLeft: 20,
        paddingBottom: 65,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
        borderRadius: 7,
        height: 250,
        padding: 15,

    },
    modalHeader: {
        flex: 3,
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    modalFooter: {
        flex: 2,
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    modalContainer: {
        flex: 4,
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    closeModal: {
        width: 10,
        marginLeft: Dimensions.get('window').width / 2 + 118,
        marginTop: 10
    }
})