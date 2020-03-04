import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Avatar, Badge, SearchBar,Overlay } from 'react-native-elements'
import Padrao from '../estilo/Padrao'

export default class overlayTest extends Component {

    state = {
        isVisible:true
    }

    alterarTexto = texto => {
        this.setState({ texto })
    }

    render(){
        return(
            <View>
               <Overlay
                isVisible={this.state.isVisible}
                windowBackgroundColor="rgba(255, 255, 255, 0.5)"
                overlayBackgroundColor="red"
                width="auto"
                height="auto"
            >
                <Text>Hello from Overlay!</Text>
            </Overlay> 
            </View>  // onChange para alterar o valor quando alterado //
        )

    }

}