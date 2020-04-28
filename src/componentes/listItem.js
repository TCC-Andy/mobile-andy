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
import { Avatar, Badge, SearchBar, Overlay } from 'react-native-elements'
import Padrao from '../estilo/Padrao'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-BR')

export default class ListItem extends Component {
    state = {
        date: new Date(),
        opemTimes: false
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
    render() {
        return (
            <View style={styles.card}>
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

        )

    }

}

const styles = StyleSheet.create({
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