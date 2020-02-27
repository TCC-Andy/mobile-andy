import React, { Component } from "react"
import{ Button, Alert, Platform, ToastAndroid } from 'react-native'

export default prosp => {
    const notificar = msg => {
        if(Platform.OS === 'android'){
            ToastAndroid.show(msg, ToastAndroid.LONG)
        }else{
            Alert.alert('Informacao', msg)
        }
    }

    return(
        <Button title= 'Plataforma?' onPress={() => notificar('Parabems')}/>
    )
}