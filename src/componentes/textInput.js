import React from 'react'
import { View, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable';

export default props => {
    return (
        <KeyboardAvoidingView
            behavior= 'padding'>
            <Animatable.View animation={props.ani} duration ={props.dur}
            style={[styles.container, props.style]}>
                <Icon name={props.icon} size={19} style={styles.icon} />
                <TextInput {...props} style={styles.input} />
            </Animatable.View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: '#333',
        marginLeft: 8
    },
    input: {
        marginLeft: 5,
        width: '92%'
    }
})