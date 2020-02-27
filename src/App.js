import React, {Component } from 'react'
import {View, StyleSheet } from 'react-native'
import Simples from './componentes/Simples'
import ParImpar from './componentes/ParImpar'
import { Inverter,MegaSena } from './componentes/Multi'  //Inverter nas chaves porque nao foi export com default //caso seja default obrigario sem as chave                           

export default class App extends Component {
  render(){
    return (
      <View style={styles.container} >  
        <Simples texto='flexivel'/>   
        <ParImpar numero={31}></ParImpar>
        <Inverter texto='Reactv-native'></Inverter>
        <MegaSena numeros={6} ></MegaSena>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  f20: {
    fontSize: 40
  }
})