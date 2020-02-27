import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

export default class Pagina2 extends Component{
    
    render() {
        return(
            <View>
                <Button
        title="main"
        onPress={() => this.props.navigation.navigate ( 'Main' ) }
      />
                <Text> pagina 2 test 1 </Text>
                <Button
        title="Maps"
        onPress={() => this.props.navigation.navigate ( 'Maps' ) }
      />
        <Text> Home1 </Text>
                <Button
        title="Home1"
        onPress={() => this.props.navigation.navigate ( 'Home' ) }
      />
            </View>
        )
    }
}