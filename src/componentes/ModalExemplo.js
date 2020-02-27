import React, { Component } from 'react'
import {
    Platform,
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'


export default class ModalExemplo extends Component {




    render() {
        
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={false}
                animationType='slide'>
                <TouchableWithoutFeedback
                   >
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback
                >
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        backgroundColor: 'red',
        color:'white',
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: 'white'
    },
    date: {
        fontSize: 20,
        marginLeft: 15
    }
})