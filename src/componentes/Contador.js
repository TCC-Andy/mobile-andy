import React, { Component } from "react"
import{ View, Text, TouchableHighlight } from 'react-native'

export default class Contador extends Component {
    state = {
        numero: 0
        // numero : this.props.numero  //para inciar  com parametro
    }
    /*
    constructor(prosp){
        super(prosp)
        this.maisUm = this.maisUm.bind(this) // amarando o this para a funcao maisUm / resumnido o this apontando para o Contador
    }*/
    maisUm = () => {
        this.setState({numero : this.state.numero +1 })
    }
    limpar = () =>{
        this.setState({numero : 0})
    }
    render(){
        return(
            <View>
                <Text style={{fontSize: 40}}> { this.state.numero }</Text>

                <TouchableHighlight onPress={this.maisUm}
                onLongPress = {this.limpar}>
                   <Text>Incrementar/Zera</Text> 
                </TouchableHighlight>
            </View>
        )
    }
}
