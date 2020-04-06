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
import { Card } from "react-native-elements";
import { Avatar, Badge, SearchBar,Overlay } from 'react-native-elements'
import Padrao from '../estilo/Padrao'

export default class ListItem extends Component {

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
})