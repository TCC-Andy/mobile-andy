import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

export default class Pagina3 extends Component{
    
    render() {
        return(
            <View>
                <Button
        title="main"
        onPress={() => this .props.navigation.navigate ( 'Main' ) }
      />
                <Text> pagina 3</Text>
                <Button
        title="Maps"
        onPress={() => this .props.navigation.navigate ( 'Maps' ) }
      />
            </View>
        )
    }
}