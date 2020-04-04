import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Modal,
  Dimensions,
} from 'react-native'

export default class activIndicador extends Component {
  render() {
    /*modal animationTYPE  -> none fade slide*/
      return (

        <Modal transparent={true} visible={this.props.animating}
          animationType='fade'>
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal >
      )
    } 
}

const styles = StyleSheet.create({
  container: {
   // marginTop: Dimensions.get('window').height/5,
    flexDirection:'row',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',

  }

})
/**   <ActivityIndicator animating={this.props.animating}  size="small" color="#00ff00" />
        <ActivityIndicator animating={this.props.animating}  size="large" color="#0000ff" />
        <ActivityIndicator animating={this.props.animating}  size="small" color="#00ff00" />
       */